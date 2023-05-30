import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  try {
    const { pageId } = req.query;
    const response = await notion.blocks.children.list({ block_id: pageId });
    const blocks = response.results;
    res.status(200).json(blocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
