import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/Reveal";
import { RegistrationForm } from "@/components/RegistrationForm";

export default function Volunteer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(hsl(var(--brand-gold))/0.12_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-start">
            <div>
              <Reveal>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  Volunteer
                </h1>
                <p className="mt-2 text-muted-foreground max-w-2xl">
                  Be part of a high-impact team delivering the 4th Igiehon Mathematics Tournament. Roles
                  include logistics, ushering, scoring, communications and
                  media.
                </p>
                <div className="mt-6 rounded-xl border bg-card p-6">
                  <h3 className="font-semibold">Why volunteer?</h3>
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Make a difference for students across Edo State</li>
                    <li>Gain event operations and leadership experience</li>
                    <li>
                      Certificate of service and recommendation where applicable
                    </li>
                  </ul>
                </div>
                <div className="mt-6 rounded-xl border bg-card p-6">
                  <h3 className="font-semibold">Time Commitment</h3>
                  <p className="text-sm text-muted-foreground">
                    Pre-event briefings (virtual), 1 full event day, and
                    optional post-event debrief.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <Reveal>
                <p className="text-xs text-muted-foreground mb-4">Location: Benin City, Edo State</p>
                <RegistrationForm interest="volunteer" />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
