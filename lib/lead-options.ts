/* Constants for the appointment form. public/api/lead.php repeats the service list: keep them in sync. */

/** The "Service" choices of the old site's GoHighLevel form, in the same order. */
export const serviceOptions = [
  "General Dentistry",
  "Dental Cleanings",
  "Dental Bridges",
  "Dental Crowns",
  "Dentures",
  "Oral Surgery",
  "Sedation Dentistry",
  "Root Canal Treatment",
  "TMJ Treatment",
  "Cosmetic Dentistry",
  "Smile Makeovers",
  "Invisalign",
  "Clear Aligners",
  "Teeth Whitening",
  "Tooth-Colored Fillings",
  "Dental Veneers",
  "Dental Implants",
  "Gum Therapy",
  "Laser Dental Treatment",
  "Sleep Apnea Treatment",
  "Reconstructive / Advanced Dentistry",
  "All on 4 Teeth in a Day",
  "Reconstructive Dentistry",
  "Full Mouth Reconstruction",
  "Worn Teeth Rehabilitation",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];

export const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export const ATTRIBUTION_STORAGE_KEY = "sbj_attribution";

/** Minimum time a person needs to fill the form. Faster submits are treated as suspect. */
export const MIN_FILL_MS = 2500;
