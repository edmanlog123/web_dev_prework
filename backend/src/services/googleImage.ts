import axios from 'axios';

const ZENSERP_API_KEY = '58bc3c30-6eb3-11f0-9b60-2988757e4113';

export async function getTop5Thumbnails(query: string): Promise<string[]> {
  try {
    const response = await axios.get('https://app.zenserp.com/api/v2/search', {
      params: {
        apikey: ZENSERP_API_KEY,
        q: query,
        tbm: 'isch',
        num: 10 // fetch more than 5 in case some don't have thumbnails
      }
    });

    const results = response.data.image_results;

    // Extract up to 5 valid thumbnails
    const thumbnails: string[] = results
      .map((result: any) => result.thumbnail)
      .filter((thumb: string | undefined) => typeof thumb === 'string')
      .slice(0, 5); // limit to first 5

    return thumbnails;
  } catch (error) {
    console.error("Error fetching thumbnails:", error);
    return [];
  }
}
