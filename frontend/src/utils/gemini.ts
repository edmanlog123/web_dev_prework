const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function fetchCreatorData(query: string) {
  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Give me the bio, image link and main social links for the public figure: ${query}. Format the response like this:

{
  "bio": "...",
  "image": "...",
  "links": [
    { "type": "YouTube", "url": "..." },
    { "type": "Twitter", "url": "..." }
  ]
}`,
            },
          ],
        },
      ],
    }),
  });

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error("Gemini response failed.");

  return JSON.parse(text);
}
