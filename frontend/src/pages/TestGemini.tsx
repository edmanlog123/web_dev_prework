import { useState } from "react";
import { fetchCreatorSuggestion } from "../utils/gemini";

export default function TestGemini() {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState<any>(""); // Use any or a specific type for the object

  const handleFetch = async () => {
    try {
      const result = await fetchCreatorSuggestion(query);
      setOutput(result);
    } catch (err) {
      setOutput("Error: " + (err as Error).message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Gemini Test</h1>
      <input
        type="text"
        placeholder="Enter creator name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleFetch}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Test Gemini
      </button>

      <pre className="mt-6 whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded">
        {
          // Check if output is an object and stringify it, otherwise display as is
          typeof output === 'object' && output !== null
            ? JSON.stringify(output, null, 2) // Pretty print with 2 spaces indentation
            : output
        }
      </pre>
    </div>
  );
}