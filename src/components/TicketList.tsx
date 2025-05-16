import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import TicketSettings from "./TicketSettings";

interface Ticket {
  id: string;
  title: string;
  status: string;
  priority: string;
  claimed_by: string | null;
  created_by: string;
}

interface Props {
  userId: string;
  role: string;
  onSelect: (ticket: Ticket) => void;
}

const TicketList = ({ userId, role, onSelect }: Props) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<"all" | "open" | "claimed" | "mine">("all");

  useEffect(() => {
    fetchTickets();
  }, [filter]);

  const fetchTickets = async () => {
    let query = supabase.from("tickets").select("*").order("created_at", { ascending: false });

    if (filter === "open") query = query.eq("status", "open");
    else if (filter === "claimed") query = query.not("claimed_by", "is", null);
    else if (filter === "mine") query = query.or(`created_by.eq.${userId},claimed_by.eq.${userId}`);

    const { data, error } = await query;

    if (error) toast.error("Failed to fetch tickets");
    else setTickets(data);
  };

  const claimTicket = async (id: string) => {
    const { error } = await supabase.from("tickets").update({ claimed_by: userId }).eq("id", id);
    if (error) return toast.error("Failed to claim ticket");
    toast.success("Ticket claimed!");
    fetchTickets();
  };

  const closeTicket = async (id: string) => {
    const { error } = await supabase.from("tickets").update({ status: "closed" }).eq("id", id);
    if (error) return toast.error("Failed to close ticket");
    toast.success("Ticket closed!");
    fetchTickets();
  };

  const deleteTicket = async (id: string) => {
    const { error } = await supabase.from("tickets").delete().eq("id", id);
    if (error) return toast.error("Failed to delete ticket");
    toast.success("Ticket deleted.");
    fetchTickets();
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2">
        {["all", "open", "claimed", "mine"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-3 py-1 rounded ${filter === f ? "bg-vorld-blue text-white" : "bg-gray-800 text-gray-300"}`}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Ticket List */}
      {tickets.length === 0 ? (
        <p className="text-gray-400">No tickets found.</p>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="p-4 bg-vorld-dark border border-gray-700 rounded-lg flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h3
                className="font-semibold cursor-pointer hover:underline text-lg"
                onClick={() => onSelect(ticket)}
              >
                #{ticket.id.slice(0, 6)} - {ticket.title}
              </h3>
              <span className="text-sm bg-gray-700 px-2 py-1 rounded text-white">
                {ticket.status}
              </span>
            </div>

            <p className="text-xs text-gray-400">Priority: {ticket.priority}</p>

            {/* Admin Controls */}
            {role === "admin" && (
              <div className="flex gap-2 mt-2">
                {ticket.status !== "closed" && (
                  <button onClick={() => closeTicket(ticket.id)} className="text-vorld-blue text-sm">
                    Close
                  </button>
                )}
                {!ticket.claimed_by && (
                  <button onClick={() => claimTicket(ticket.id)} className="text-vorld-purple text-sm">
                    Claim
                  </button>
                )}
                <button onClick={() => deleteTicket(ticket.id)} className="text-red-500 text-sm">
                  Delete
                </button>
              </div>
            )}

            {/* Ticket Settings Panel (rename / update) */}
            {role === "admin" && <TicketSettings ticket={ticket} onRefresh={fetchTickets} />}
          </div>
        ))
      )}
    </div>
  );
};

export default TicketList;
