import { createClient } from "next-sanity";

/**
 * Sanity client configuration.
 * Ready to use once NEXT_PUBLIC_SANITY_PROJECT_ID and optionally
 * NEXT_PUBLIC_SANITY_DATASET are configured in your environment.
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});
