import { NextApiRequest, NextApiResponse } from "next";

const ENDPOINT = process.env.PROMPT_TO_CODE_API_ENDPOINT || "";
console.log(`Prompt: ${prompt}`);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { prompt } = req.query;

    try {
      const response = await fetch(`${ENDPOINT}?prompt=${prompt}&llm=openai`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Received non-JSON response");
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
