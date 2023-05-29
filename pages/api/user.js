import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const response = await notion.users.retrieve({ user_id: id });
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({ userData: response }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
