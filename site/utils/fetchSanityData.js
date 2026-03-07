import { AssetCache } from "@11ty/eleventy-fetch";
import sanityClient from "./sanityClient.js";

/**
 * @param {string} cacheName Name of the cache, should be unique to avoid cache clash.
 * @param {string} cacheTime Amount of time for the cache to be active: 15m, etc.
 * @param {string} groqQuery GROQ query to execute.
 */
export default async function (
  cacheName,
  cacheTime,
  groqQuery,
  preview = false,
) {
  // Create cache.
  const asset = new AssetCache(cacheName);

  // Check if cache is valid and we are not in a preview.
  if (asset.isCacheValid(cacheTime) && !preview) {
    // Send back the cached assets if they haven't expired yet.
    return asset.getCachedValue();
  }

  // Create sanity client.
  const client = sanityClient(preview);

  // Fetch data from Sanity.
  const data = await client.fetch(groqQuery);

  // Save data in cache.
  await asset.save(data, "json");

  // Return the results.
  return data;
}
