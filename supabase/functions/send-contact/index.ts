
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Use the Discord webhook provided
const discordWebhookUrl = "https://discord.com/api/webhooks/1372606770253660292/LBuQ2R2HyBQLoSidQ2mR_8jJqgIychHFp3WRed6EbTo8trW2hfTtn7PnfJAP4Vfv73n4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/** 
 * Generalized embed fields type for both contact and career applications
 */
interface EmbedBaseRequest {
  type: 'contact' | 'application';
  name: string;
  email: string;
  subject?: string;
  position?: string;
  message: string;
}

function safe(text: string | undefined): string {
  return text?.trim() ? text.trim() : "N/A";
}

function truncate(text: string, max = 1024) {
  if (!text) return "N/A";
  return text.length > max ? text.slice(0, max) + "..." : text;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const body: EmbedBaseRequest = await req.json();

    // Decide embed template based on type
    let embed: any;
    if (body.type === "application") {
      // CAREER APPLICATION EMBED
      embed = {
        title: "🌟 New Career Application",
        color: 0x00c3ff,
        description: "A new candidate has applied through the website.",
        fields: [
          { name: "👤 Name", value: safe(body.name), inline: true },
          { name: "✉️ Email", value: body.email ? `[${body.email}](mailto:${body.email})` : "N/A", inline: true },
          body.position ? { name: "💼 Position", value: safe(body.position), inline: true } : undefined,
          body.subject ? { name: "🏷️ Subject", value: safe(body.subject), inline: true } : undefined,
          { name: "📝 Application Message", value: body.message ? "```" + truncate(body.message,900) + "```" : "*No message provided*", inline: false },
        ].filter(Boolean),
        timestamp: new Date().toISOString(),
        footer: {
          text: "Fast Studios Careers System",
          icon_url: "https://media.discordapp.net/attachments/1363496516643324137/1372602598196121640/jjVXCAf.png?ex=68275f49&is=68260dc9&hm=229bc78d0b228946fc4ae0001ec2f63c4ea05b09650a4f04119013cc1ffd85cb&=&format=webp&quality=lossless&width=810&height=810"
        },
      };
    } else {
      // CONTACT FORM EMBED
      embed = {
        title: "📬 New Contact Form Submission!",
        description:
          "**You received a fresh message from the website!**\n" +
          "---------------------------------------",
        color: 0x9a6cff,
        fields: [
          { name: "👤 Name", value: safe(body.name), inline: true },
          { name: "✉️ Email", value: body.email ? `[${body.email}](mailto:${body.email})` : "N/A", inline: true },
          body.subject ? { name: "🏷️ Subject", value: safe(body.subject), inline: true } : undefined,
          { name: "📝 Message", value: body.message ? "```" + truncate(body.message,900) + "```" : "*No message provided*", inline: false },
        ].filter(Boolean),
        timestamp: new Date().toISOString(),
        footer: {
          text: "Fast Studios Contact System",
          icon_url: "https://media.discordapp.net/attachments/1363496516643324137/1372602598196121640/jjVXCAf.png?ex=68275f49&is=68260dc9&hm=229bc78d0b228946fc4ae0001ec2f63c4ea05b09650a4f04119013cc1ffd85cb&=&format=webp&quality=lossless&width=810&height=810"
        },
      };
    }

    const discordBody = JSON.stringify({ embeds: [embed] });

    // Send to Discord webhook
    const webhookRes = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: discordBody,
    });

    if (!webhookRes.ok) {
      const errorText = await webhookRes.text();
      return new Response(
        JSON.stringify({ error: "Discord webhook failed: " + errorText }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message || String(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

