import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  claimed_by: string | null;
  user_id: string;
  created_at: string;
  closed_at: string | null;
}

interface TicketMessage {
  id: string;
  ticket_id: string;
  user_id: string | null;
  message: string;
  created_at: string;
}

// Insert payload types for strong typing
interface TicketInsert {
  title: string;
  description: string;
  user_id: string;
}

interface TicketMessageInsert {
  ticket_id: string;
  user_id: string | null;
  message: string;
}

const EDGE_FUNCTION_WEBHOOK_URL =
  "https://twmwrwbtyxeceavsijka.supabase.co/functions/v1/send-contact";

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Get current user ID from Supabase auth
  useEffect(() => {
    const user = supabase.auth.user();
    if (user) setUserId(user.id);
  }, []);

  // Fetch tickets where user is creator or claimer
  const loadTickets = async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from<Ticket>("tickets")
      .select("*")
      .or(`user_id.eq.${userId},claimed_by.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setTickets(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId) loadTickets();
  }, [userId]);

  // Load messages for selected ticket
  const loadMessages = async (ticketId: string) => {
    const { data, error } = await supabase
      .from<TicketMessage>("ticket_messages")
      .select("*")
      .eq("ticket_id", ticketId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setMessages(data ?? []);
    }
  };

  // Send webhook notification via Supabase Edge Function
  const sendWebhook = async (content: string) => {
    try {
      const res = await fetch(EDGE_FUNCTION_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Webhook error:", text);
      }
    } catch (err) {
      console.error("Failed sending webhook:", err);
    }
  };

  // Create a new ticket
  const createTicket = async () => {
    if (!titleInput.trim() || !descInput.trim()) {
      alert("Please enter both title and description");
      return;
    }
    if (!userId) {
      alert("You must be logged in to create a ticket");
      return;
    }
    setLoading(true);

    const newTicket: TicketInsert = {
      title: titleInput.trim(),
      description: descInput.trim(),
      user_id: userId,
    };

    const { error } = await supabase.from("tickets").insert(newTicket);

    if (error) {
      alert(error.message);
    } else {
      sendWebhook(`🆕 New ticket created by <@${userId}>: **${titleInput}**`);
      setTitleInput("");
      setDescInput("");
      await loadTickets();
    }
    setLoading(false);
  };

  // Claim a ticket (assign to current user)
  const claimTicket = async (ticket: Ticket) => {
    if (!userId) {
      alert("You must be logged in to claim tickets");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("tickets")
      .update({ claimed_by: userId, status: "claimed" })
      .eq("id", ticket.id);

    if (error) alert(error.message);
    else {
      sendWebhook(`✅ Ticket **${ticket.title}** claimed by <@${userId}>`);
      await loadTickets();
    }
    setLoading(false);
  };

  // Close ticket
  const closeTicket = async (ticket: Ticket) => {
    if (!userId) {
      alert("You must be logged in to close tickets");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("tickets")
      .update({ status: "closed", closed_at: new Date().toISOString() })
      .eq("id", ticket.id);

    if (error) alert(error.message);
    else {
      sendWebhook(`🔒 Ticket **${ticket.title}** closed by <@${userId}>`);
      await loadTickets();
      setSelectedTicket(null);
    }
    setLoading(false);
  };

  // Delete ticket
  const deleteTicket = async (ticket: Ticket) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    setLoading(true);
    const { error } = await supabase.from("tickets").delete().eq("id", ticket.id);

    if (error) alert(error.message);
    else {
      sendWebhook(`🗑️ Ticket **${ticket.title}** deleted by <@${userId}>`);
      await loadTickets();
      setSelectedTicket(null);
    }
    setLoading(false);
  };

  // Send message to a ticket
  const sendMessage = async () => {
    if (!selectedTicket || !messageInput.trim()) return;
    if (!userId) {
      alert("You must be logged in to send messages");
      return;
    }
    setLoading(true);

    const newMessage: TicketMessageInsert = {
      ticket_id: selectedTicket.id,
      user_id: userId,
      message: messageInput.trim(),
    };

    const { error } = await supabase.from("ticket_messages").insert(newMessage);

    if (error) alert(error.message);
    else {
      sendWebhook(
        `💬 New message on ticket **${selectedTicket.title}** by <@${userId}>`
      );
      setMessageInput("");
      await loadMessages(selectedTicket.id);
    }
    setLoading(false);
  };

  // Reload messages when selected ticket changes
  useEffect(() => {
    if (selectedTicket) loadMessages(selectedTicket.id);
    else setMessages([]);
  }, [selectedTicket]);

  return (
    <div className="vorld-container py-10 flex flex-col md:flex-row gap-10 min-h-screen">
      {/* Tickets List */}
      <div className="w-full md:w-1/3 bg-vorld-dark p-6 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Tickets</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Ticket Title"
            className="w-full p-2 mb-2 rounded border border-gray-600 bg-vorld-dark text-white"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            disabled={loading}
          />
          <textarea
            placeholder="Ticket Description"
            className="w-full p-2 rounded border border-gray-600 bg-vorld-dark text-white resize-none"
            rows={3}
            value={descInput}
            onChange={(e) => setDescInput(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={createTicket}
            disabled={loading}
            className="mt-3 w-full btn-primary"
          >
            Create Ticket
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {loading && !tickets.length ? (
            <p>Loading tickets...</p>
          ) : tickets.length === 0 ? (
            <p>No tickets found.</p>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`p-3 mb-3 rounded cursor-pointer border ${
                  selectedTicket?.id === ticket.id
                    ? "border-vorld-blue bg-vorld-blue/10"
                    : "border-transparent hover:border-vorld-blue"
                }`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <h3 className="font-semibold">{ticket.title}</h3>
                <p className="text-sm text-gray-400 truncate">
                  {ticket.description}
                </p>
                <p className="text-xs mt-1">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      ticket.status === "open"
                        ? "text-green-400"
                        : ticket.status === "claimed"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </p>
                {ticket.claimed_by && (
                  <p className="text-xs text-gray-500">
                    Claimed by: {ticket.claimed_by === userId ? "You" : ticket.claimed_by}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Selected Ticket Details and Chat */}
      <div className="w-full md:w-2/3 bg-vorld-dark p-6 rounded-lg shadow-lg flex flex-col">
        {selectedTicket ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{selectedTicket.title}</h2>
            <p className="mb-6">{selectedTicket.description}</p>

            <div className="flex gap-4 mb-4 flex-wrap">
              {selectedTicket.status === "open" && (
                <button
                  onClick={() => claimTicket(selectedTicket)}
                  disabled={loading}
                  className="btn-primary"
                >
                  Claim Ticket
                </button>
              )}
              {selectedTicket.status !== "closed" && (
                <button
                  onClick={() => closeTicket(selectedTicket)}
                  disabled={loading}
                  className="btn-warning"
                >
                  Close Ticket
                </button>
              )}
              <button
                onClick={() => deleteTicket(selectedTicket)}
                disabled={loading}
                className="btn-danger"
              >
                Delete Ticket
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
                className="btn-secondary"
              >
                Back to List
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 border border-gray-600 rounded p-4 bg-vorld-dark-light flex flex-col space-y-3">
              {messages.length === 0 ? (
                <p>No messages yet.</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded max-w-[75%] self-start ${
                      msg.user_id === userId
                        ? "bg-vorld-blue/50 self-end"
                        : "bg-vorld-purple/50 self-start"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <span className="text-xs text-gray-300">
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Message input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                disabled={loading}
                className="flex-1 p-2 rounded border border-gray-600 bg-vorld-dark text-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !messageInput.trim()}
                className="btn-primary px-6"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a ticket to view details and messages.</p>
        )}
      </div>
    </div>
  );
};

export default Tickets;
