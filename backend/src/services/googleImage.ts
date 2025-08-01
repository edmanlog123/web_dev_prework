import axios from 'axios';

const ZENSERP_API_KEY = '58bc3c30-6eb3-11f0-9b60-2988757e4113';

async function searchImages(query: string): Promise<void> {
  const url = 'https://app.zenserp.com/api/v2/search';
  
  try {
    const response = await axios.get(url, {
      params: {
        apikey: ZENSERP_API_KEY,
        q: query,
        tbm: 'isch',     // image search mode
        num: 10          // number of results to return
      }
    });

    console.log(response.data);
  } catch (error) {
    console.error('Zenserp API request failed:', error);
  }
}

searchImages("Kai Cenat");
