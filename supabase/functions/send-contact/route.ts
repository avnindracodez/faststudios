// supabase/functions/upload/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const discordWebhookUrl = Deno.env.get("DISCORD_UPLOAD_WEBHOOK");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const embed = {
      title: "📁 New Upload Received",
      color: 0x00c3ff,
      fields: [
        { name: "🔗 File URL", value: body.fileUrl || "N/A" },
        { name: "📄 File Name", value: body.fileName || "Unknown" },
        { name: "👤 Uploaded By", value: body.uploader || "Anonymous" }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Fast Studios Upload Bot",
        icon_url: "https://vorld-studio.com/favicon.ico"
      }
    };

    const discordRes = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] })
    });

    if (!discordRes.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send to Discord." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
};

serve(handler);
