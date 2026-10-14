/**
 * Smiles By Jiveh Sanity project. The project ID is public (it is in every
 * image URL). The env vars override it, e.g. for a staging dataset.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3wz2011s";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-02-19";
