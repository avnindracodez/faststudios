// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { link, prefix } = req.body;

  if (!link || !prefix) {
    return res.status(400).json({ error: "Missing 'link' or 'prefix'" });
  }

  try {
    const fileName = link.split("/").pop();
    const converted = `https://faststudios.online/content/${prefix}/${fileName}`;

    return res.status(200).json({ converted });
  } catch (error) {
    console.error("Upload handler error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}
