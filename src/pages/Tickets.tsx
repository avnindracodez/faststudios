import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import TicketChat from "@/components/TicketChat";
import TicketSettings from "@/components/TicketSettings";

const FILTERS = ["All", "Mine", "Open", "Claimed"] as const;
type Filter = typeof FILTERS[number];

const TicketsPage = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [role, setRole] = useState<string>("user");
  const [userId, setUserId] = useState<string | null>(null);
  const [newReplies, setNewReplies] = useState<Record<string, boolean>>({});

  // Fetch user session & role
  useEffect(() => {
    supabase.auth.getSession().then(({ data: sessionData }) => {
      if (sessionData.session) {
        const user = sessionData.session.user;
        setUserId(user.id);
        // fetch role
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .then(({ data }) => {
            if (data && data.length > 0) setRole(data[0].role);
            else setRole("user");
          });
      }
    });
  }, []);

  // Fetch tickets based on filter & user
  useEffect(() => {
    fetchTickets();
  }, [filter, userId]);

  useEffect(() => {
    if (!selectedTicket) return;
    // Reset new reply badge on open
    setNewReplies((prev) => ({ ...prev, [selectedTicket.id]: false }));
  }, [selectedTicket]);

  // Setup real-time updates on tickets & messages
  useEffect(() => {
    const ticketSub = supabase
      .channel("tickets")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tickets" },
        (payload) => {
          setTickets((prev) => [...prev, payload.new]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "tickets" },
        (payload) => {
          setTickets((prev) =>
            prev.map((t) => (t.id === payload.new.id ? payload.new : t))
          );
          // If updated ticket is not currently open, mark as having new replies
          if (selectedTicket?.id !== payload.new.id) {
            setNewReplies((prev) => ({ ...prev, [payload.new.id]: true }));
          }
        }
      )
      .subscribe();

    const msgSub = supabase
      .channel("ticket_messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "ticket_messages" },
        (payload) => {
          // Optionally update messages if you keep messages in parent component
          // Here we'll just mark tickets with new replies if not selected
          const tid = payload.new.ticket_id;
          if (selectedTicket?.id !== tid) {
            setNewReplies((prev) => ({ ...prev, [tid]: true }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ticketSub);
      supabase.removeChannel(msgSub);
    };
  }, [selectedTicket]);

  async function fetchTickets() {
    if (!userId) return;

    let query = supabase.from("tickets").select("*");

    if (filter === "Mine") {
      query = query.eq("created_by", userId);
    } else if (filter === "Open") {
      query = query.eq("status", "open");
    } else if (filter === "Claimed") {
      query = query.not("claimed_by", "is", null);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load tickets");
      return;
    }

    setTickets(data || []);
  }

  async function claimTicket(id: string) {
    if (role !== "admin") return toast.error("Admin only");
    const { error } = await supabase
      .from("tickets")
      .update({ claimed_by: userId })
      .eq("id", id);
    if (error) toast.error("Failed to claim");
  }

  async function closeTicket(id: string) {
    if (role !== "admin") return toast.error("Admin only");
    const { error } = await supabase
      .from("tickets")
      .update({ status: "closed" })
      .eq("id", id);
    if (error) toast.error("Failed to close");
  }

  async function deleteTicket(id: string) {
    if (role !== "admin") return toast.error("Admin only");
    const { error } = await supabase.from("tickets").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else if (selectedTicket?.id === id) setSelectedTicket(null);
  }

  const canCreateTicket = !tickets.some(
    (t) =>
      t.created_by === userId &&
      (t.status === "open" || t.status === "claimed")
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto">
      {/* Tickets List */}
      <aside className="md:w-96 bg-vorld-dark/70 rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tickets</h2>
          <select
            className="bg-vorld-dark border border-vorld-blue rounded-md p-1 px-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
          >
            {FILTERS.map((f) => (
              <option key={f} value={f}>
                {f} {newReplies[tickets.find((t) => t.status === f.toLowerCase())?.id || ""] ? "•" : ""}
              </option>
            ))}
          </select>
        </div>

        {!canCreateTicket && (
          <div className="mb-2 p-2 bg-vorld-pink/30 rounded-md text-sm font-medium text-pink-300">
            You already have an open or claimed ticket.
          </div>
        )}

        <div className="overflow-y-auto flex-1">
          {tickets.length === 0 && (
            <div className="text-muted-foreground text-center py-6">
              No tickets found.
            </div>
          )}
          <ul className="space-y-2">
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${
                  selectedTicket?.id === ticket.id
                    ? "bg-vorld-blue/50"
                    : "hover:bg-vorld-blue/20"
                }`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <div>
                  <div className="font-semibold">{ticket.title}</div>
                  <div className="text-xs text-muted-foreground">
                    Status: {ticket.status}{" "}
                    {ticket.claimed_by && (
                      <span className="ml-2 italic text-vorld-pink">
                        Claimed
                      </span>
                    )}
                  </div>
                </div>
                {newReplies[ticket.id] && (
                  <span className="bg-vorld-pink rounded-full w-3 h-3 inline-block" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {canCreateTicket && (
          <Button
            onClick={() => setSelectedTicket({ id: "new", title: "", description: "", status: "open", priority: "normal", created_by: userId })}
            className="mt-4"
          >
            + New Ticket
          </Button>
        )}
      </aside>

      {/* Ticket Details & Chat */}
      <main className="flex-1 bg-vorld-dark/70 rounded-lg p-6">
        {!selectedTicket && (
          <div className="text-muted-foreground text-center mt-10">
            Select a ticket to view details and chat.
          </div>
        )}

        {selectedTicket && selectedTicket.id === "new" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Create Ticket</h2>
            {/* Replace this with your CreateTicketModal or form */}
            <p>Form to create new ticket here (implement separately)</p>
            <Button onClick={() => setSelectedTicket(null)}>Cancel</Button>
          </div>
        )}

        {selectedTicket && selectedTicket.id !== "new" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">{selectedTicket.title}</h2>
            <p className="mb-4">{selectedTicket.description}</p>
            <div className="flex gap-2 mb-4">
              {role === "admin" && (
                <>
                  <Button onClick={() => claimTicket(selectedTicket.id)}>
                    Claim
                  </Button>
                  <Button onClick={() => closeTicket(selectedTicket.id)}>
                    Close
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteTicket(selectedTicket.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>

            {/* Chat component */}
            <TicketChat ticketId={selectedTicket.id} role={role} />

            {/* Admin settings */}
            {role === "admin" && (
              <TicketSettings
                ticketId={selectedTicket.id}
                currentTitle={selectedTicket.title}
                currentPriority={selectedTicket.priority}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default TicketsPage;
