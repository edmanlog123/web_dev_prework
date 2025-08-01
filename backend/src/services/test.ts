import { getImageUrl } from "./googleImage";
import "dotenv/config"; // Ensure env vars load

async function run() {
  const query = "The Rock";
  const imageUrl = await getImageUrl(query);
  console.log("🔍 Image URL returned:", imageUrl);
}

run();
