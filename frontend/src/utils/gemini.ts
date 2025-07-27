const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function fetchCreatorSuggestion(query: string) {
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
              text: `Your task is to provide information about a public figure.
You MUST ONLY return a valid JSON object. Do NOT include any other text, explanations, or markdown outside of the JSON block.

Here is the EXACT JSON structure you must follow:

\`\`\`json
{
  "bio": "...",
  "image": "...",
  "links": [
    { "type": "YouTube", "url": "..." },
    { "type": "Twitter", "url": "..." },
    { "type": "Instagram", "url": "..." }
  ]
}
\`\`\`

The public figure is: ${query}`, //
            },
          ],
        },
      ],
    }),
  });

  const result = await response.json();
  let text = result?.candidates?.[0]?.content?.parts?.[0]?.text; //

  // IMPORTANT: Extract content from markdown code block if Gemini includes it
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/); //
  if (jsonMatch && jsonMatch[1]) { //
    text = jsonMatch[1]; //
  } else if (!text || !text.trim().startsWith("{")) { //
    // Fallback or re-throw if it's still not valid JSON outside a code block //
    throw new Error("Gemini did not return valid JSON or a JSON code block."); //
  }


  try {
    return JSON.parse(text); //
  } catch (err) {
    console.error("Failed to parse Gemini response:", text, err); //
    throw new Error("Failed to parse Gemini response."); //
  }
}