import axios from "axios";

const API_KEY = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
const CX = process.env.GOOGLE_CUSTOM_SEARCH_CX;

export async function getImageUrl(query: string): Promise<string | null> {
  try {
    const response = await axios.get("https://customsearch.googleapis.com/customsearch/v1", {
      params: {
        q: query,
        searchType: "image",
        cx: CX,
        key: API_KEY,
        num: 1,
        safe: "high",
      },
    });

    const imageLink = response.data.items?.[0]?.link;
    return imageLink || null;
  } catch (error: any) {
    console.error("Google Image Search Error:", error?.response?.data || error.message);
    return null;
  }
}
