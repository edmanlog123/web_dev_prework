// test.ts
import { getTop5Thumbnails } from './googleImage';

async function runTest() {
  const thumbnails = await getTop5Thumbnails("kai cenat");

  console.log("🔍 Top 5 thumbnails for 'kai cenat':");
  thumbnails.forEach((url, index) => {
    console.log(`${index + 1}: ${url}`);
  });
}

runTest();
