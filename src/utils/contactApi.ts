
/**
 * Helper to submit contact form data to Supabase and trigger backend email
 */
import { supabase } from "@/integrations/supabase/client";

export async function submitContactForm(
  form: { name: string; email: string; subject: string; type: string; message: string }
): Promise<{ ok: true } | { ok: false; error: string }> {
  // Save to Supabase
  const { error } = await supabase.from("contact_submissions").insert([form]);
  if (error) {
    return { ok: false, error: error.message };
  }

  // Call Edge Function to send email
  try {
    const res = await fetch(
      "https://twmwrwbtyxeceavsijka.supabase.co/functions/v1/send-contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    if (!res.ok) {
      const { error } = await res.json();
      return { ok: false, error: error || "Could not send email." };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
