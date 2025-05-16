import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TicketSettings({ ticketId, currentTitle, currentPriority }) {
  const [title, setTitle] = useState(currentTitle || "");
  const [priority, setPriority] = useState(currentPriority || "normal");

  const saveSettings = async () => {
    const { error } = await supabase
      .from("tickets")
      .update({ title, priority })
      .eq("id", ticketId);
    if (error) {
      toast.error("Failed to update ticket");
    } else {
      toast.success("Ticket updated");
    }
  };

  return (
    <div className="mt-6 border rounded-xl p-4 bg-black/30 space-y-4">
      <h2 className="text-lg font-semibold">Ticket Settings</h2>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ticket title"
        className="bg-vorld-dark/60"
      />
      <select
        className="w-full p-2 rounded-md bg-vorld-dark/60"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="urgent">Urgent</option>
      </select>
      <Button onClick={saveSettings}>Save Settings</Button>
    </div>
  );
}
