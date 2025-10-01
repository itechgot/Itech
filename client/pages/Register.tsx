import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/RegistrationForm";
import { upcomingEvent } from "@/data/content";

export default function Register() {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  const interest = (params.get("interest") || "event") as
    | "event"
    | "volunteer"
    | "partner";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(hsl(var(--brand-gold))/0.15_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Register for the 4th Igiehon Mathematics Tournament
              </h1>
              <p className="text-muted-foreground mt-2">
                Event: {upcomingEvent.date} • Benin City, Edo State
              </p>
              <ul className="mt-4 text-sm list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Free registration</li>
                <li>Registration Window: {upcomingEvent.registrationWindow}</li>
              </ul>
              <div className="mt-6 rounded-xl border bg-card p-5">
                <h3 className="font-semibold">Eligibility Criteria</h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Open to all Senior Secondary Schools in Edo State</li>
                  <li>
                    All participants must be current Senior Secondary Students
                  </li>
                  <li>
                    Teams consist of two (2) students from any class or
                    department
                  </li>
                  <li>Teams must identify a teacher coach at registration</li>
                  <li>
                    Competition includes written test (Initial Round) and oral
                    segment (Finals)
                  </li>
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border bg-card/90 backdrop-blur p-6 shadow-lg ring-1 ring-border">
              <RegistrationForm interest={interest} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
