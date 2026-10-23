/*
 * TTR OS's "Suggest a change" bar, on Vercel previews only (never the live site). It does nothing unless the
 * page was opened from the client's private review link (the link adds a review token after #). The client
 * highlights words on the draft and leaves notes for TTR; nothing on this site changes.
 */
export function ReviewBar() {
  return process.env.VERCEL_ENV === "preview" ? <script defer src="https://ttr-portal.vercel.app/api/site/notes/bar" /> : null;
}
