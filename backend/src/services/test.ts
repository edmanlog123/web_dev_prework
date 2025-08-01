// test.ts

// Import the function from the googleImage.ts file.
// The path './googleImage' assumes both files are in the same directory.
import { getGoogleImageUrl } from './googleImage';

/**
 * This is the main function to demonstrate how to use getGoogleImageUrl.
 * It's wrapped in an immediately-invoked async function to use `await`.
 */
(async () => {
  // *** IMPORTANT: Replace this API key with your actual Zenserp API key. ***
  // I have included the key from your screenshot here.
  const apiKey = '58bc3c30-6eb3-11f0-9b60-2908757e4113'; 

  const searchQuery = 'Kai Cenat';
  
  console.log(`Searching for an image URL of "${searchQuery}"...`);
  
  // Call the function to get the image URL.
  const imageUrl = await getGoogleImageUrl(apiKey, searchQuery);
  
  // Check if a URL was successfully returned and log the result.
  if (imageUrl) {
    console.log('Success! Found image URL:');
    console.log(imageUrl);
  } else {
    console.log('Failed to find an image URL.');
  }
})();
