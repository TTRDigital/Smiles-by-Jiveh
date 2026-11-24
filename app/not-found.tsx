import { Button } from "@/components/ui/Button";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="container-x py-20 md:py-32">
        <div className="text-center">
          <p className="pill centered">Error 404</p>
          <h1 className="mx-auto mt-6 max-w-[860px] text-[38px] leading-[1.08] md:text-[64px]">This page could not be <em>found.</em></h1>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.8] md:text-base">The page you’re looking for has moved or doesn’t exist. Let’s get you back to a healthy smile.</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Button href="/">Back to home</Button>
            <Button href="/appointment/" variant="outline">
              Book An Appointment
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
