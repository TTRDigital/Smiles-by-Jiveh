/** Leaves Draft Mode (Vercel previews only): /api/preview/exit/ */
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
