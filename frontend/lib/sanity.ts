import { createClient } from "next-sanity";

// Re-export from the central types file for backward compatibility
export type { SiteSettings } from "../types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nxi2nagn",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  // Public pages can use Sanity's CDN to avoid intermittent slow origin queries.
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
  timeout: 30000,
  maxRetries: 1,
});

export async function safeFetch<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {},
): Promise<T> {
  try {
    return (await client.fetch(query, params)) as T;
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return fallback;
  }
}

/** Read Sanity settings without the CDN so changes made in the admin are visible immediately. */
export async function safeFetchFresh<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {},
): Promise<T> {
  try {
    return (await client.withConfig({ useCdn: false }).fetch(query, params)) as T;
  } catch (error) {
    console.error("Fresh Sanity fetch failed:", error);
    return fallback;
  }
}
