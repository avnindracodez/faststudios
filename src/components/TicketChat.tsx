import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TicketChatProps {
  ticketId: string;
  role: string;
}

export default function TicketChat({ ticketId, role }: TicketChatProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    const subscription = supabase
      .channel("ticket-chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "ticket_messages" },
        (payload) => {
          if (payload.new.ticket_id === ticketId) {
            setMessages((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [ticketId]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("ticket_messages")
      .select("*")
      .eq("ticket_id", ticketId)
      .order("created_at", { ascending: true });
    if (!error) setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    const { error } = await supabase.from("ticket_messages").insert([
      {
        ticket_id: ticketId,
        content: newMessage,
        user_id: user.id,
      },
    ]);

    if (error) {
      toast.error("Message failed");
      console.error("Error sending message:", error.message);
    } else {
      setNewMessage("");
      sendWebhook(user.email || "Unknown", newMessage);
    }
  };

  const sendWebhook = async (username: string, content: string) => {
    await fetch("/api/notify-webhook", {
      method: "POST",
      body: JSON.stringify({
        type: "ticket",
        username,
        content,
        ticketId,
      }),
    });
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mt-6 border rounded-xl p-4 bg-black/30">
      <h2 className="text-lg font-semibold mb-4">Live Chat</h2>
      <div className="h-64 overflow-y-auto space-y-3 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-xl max-w-[80%] ${
              msg.user_id === supabase.auth.getUser()?.user?.id
                ? "bg-vorld-blue/20 ml-auto"
                : "bg-white/10"
            }`}
          >
            <div className="text-sm text-muted-foreground">
              {msg.user_id === supabase.auth.getUser()?.user?.id
                ? "You"
                : msg.user_id}
            </div>
            <div>{msg.content}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex gap-2 mt-4"
      >
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-vorld-dark/60 border-none"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
