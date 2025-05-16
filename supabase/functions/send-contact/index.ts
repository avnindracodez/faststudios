import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// Use the Discord webhook provided
const discordWebhookUrl = Deno.env.get("DISCORD_WEBHOOK_URL");
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
function safe(text) {
  return text?.trim() ? text.trim() : "N/A";
}
function truncate(text, max = 1024) {
  if (!text) return "N/A";
  return text.length > max ? text.slice(0, max) + "..." : text;
}
const handler = async (req)=>{
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  try {
    const body = await req.json();
    // Decide embed template based on type
    let embed;
    if (body.type === "application") {
      // CAREER APPLICATION EMBED
      embed = {
        title: "🌟 New Career Application",
        color: 0x00c3ff,
        description: "A new candidate has applied through the website.",
        fields: [
          {
            name: "👤 Name",
            value: safe(body.name),
            inline: true
          },
          {
            name: "✉️ Email",
            value: body.email ? `[${body.email}](mailto:${body.email})` : "N/A",
            inline: true
          },
          body.position ? {
            name: "💼 Position",
            value: safe(body.position),
            inline: true
          } : undefined,
          body.subject ? {
            name: "🏷️ Subject",
            value: safe(body.subject),
            inline: true
          } : undefined,
          {
            name: "📝 Application Message",
            value: body.message ? "```" + truncate(body.message, 900) + "```" : "*No message provided*",
            inline: false
          }
        ].filter(Boolean),
        timestamp: new Date().toISOString(),
        footer: {
          text: "Fast Studios Careers System",
          icon_url: "https://vorld-studio.com/favicon.ico"
        }
      };
    } else {
      // CONTACT FORM EMBED
      embed = {
        title: "📬 New Contact Form Submission!",
        description: "**You received a fresh message from the website!**\n" + "---------------------------------------",
        color: 0x9a6cff,
        fields: [
          {
            name: "👤 Name",
            value: safe(body.name),
            inline: true
          },
          {
            name: "✉️ Email",
            value: body.email ? `[${body.email}](mailto:${body.email})` : "N/A",
            inline: true
          },
          body.subject ? {
            name: "🏷️ Subject",
            value: safe(body.subject),
            inline: true
          } : undefined,
          {
            name: "📝 Message",
            value: body.message ? "```" + truncate(body.message, 900) + "```" : "*No message provided*",
            inline: false
          }
        ].filter(Boolean),
        timestamp: new Date().toISOString(),
        footer: {
          text: "Fast Studios Contact System",
          icon_url: "https://vorld-studio.com/favicon.ico"
        }
      };
    }
    const discordBody = JSON.stringify({
      embeds: [
        embed
      ]
    });
    // Send to Discord webhook
    const webhookRes = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: discordBody
    });
    if (!webhookRes.ok) {
      const errorText = await webhookRes.text();
      return new Response(JSON.stringify({
        error: "Discord webhook failed: " + errorText
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }
    return new Response(JSON.stringify({
      success: true
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error?.message || String(error)
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }
};
serve(handler);
