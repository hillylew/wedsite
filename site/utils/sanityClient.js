import "dotenv/config";
import { createClient } from "@sanity/client";

export default function (preview = false) {
  return createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    apiVersion: "2023-09-13",
    useCdn: false,
    token: preview ? process.env.SANITY_STUDIO_PREVIEW_TOKEN : "",
    perspective: preview ? "drafts" : "published",
  });
}
