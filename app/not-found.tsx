import { Button } from "@/components/ui/Button";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="container-x py-[25px]">
        <div className="card px-5 py-16 text-center md:py-24">
          <p className="pill">Error 404</p>
          <h1 className="mt-5 text-[32px] leading-[1.2] md:text-[52px]">This page could not be found.</h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] md:text-base">The page you’re looking for has moved or doesn’t exist. Let’s get you back to a healthy smile.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-5">
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
