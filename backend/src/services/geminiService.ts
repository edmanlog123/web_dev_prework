// backend/src/services/geminiService.ts

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0,
  maxOutputTokens: 1024,
  apiKey: process.env.GOOGLE_API_KEY,
});

const SYSTEM_PROMPT = `
You are a helpful assistant that provides structured public figure information.
Return ONLY a valid JSON object with the following format:

{
  "bio": "...",
  "image": "...",
  "links": [
    { "type": "YouTube", "url": "..." },
    { "type": "Twitter", "url": "..." },
    { "type": "Instagram", "url": "..."}
  ]
}


No extra text. No markdown. Just JSON.

`;

export async function fetchCreatorSuggestion(name: string) {
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: `The public figure is: ${name}` },
  ];

  const response = await model.invoke(messages);
  const content = typeof response.content === "string" ? response.content : "";
  // Try to clean and parse the JSON
  const json = extractJson(content);
  return JSON.parse(json);
}

function extractJson(text: string): string {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found in Gemini response.");
  return match[0];
}
