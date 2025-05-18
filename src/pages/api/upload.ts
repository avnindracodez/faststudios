import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

export const prerender = false; // dynamic route

export const POST: APIRoute = async ({ request }) => {
  const { prefix, fileName, fileData } = await request.json();

  if (!prefix || !fileName || !fileData) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  const uploadDir = path.resolve(`./public/content/${prefix}`);
  const filePath = path.join(uploadDir, fileName);

  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(filePath, Buffer.from(fileData, "base64"));

    return new Response(JSON.stringify({ success: true, url: `/content/${prefix}/${fileName}` }), {
      status: 200,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: "Failed to save file" }), { status: 500 });
  }
};
