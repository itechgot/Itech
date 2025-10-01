import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { RegistrationForm } from "@/components/RegistrationForm";
import { partners } from "@/data/content";

export default function Partners() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(hsl(var(--brand-gold))/0.12_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="container py-16 md:py-24">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Strategic Partnerships
              </h1>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Partner with the Igiehon Foundation to advance academic
                excellence across Edo State. Together we can empower students
                and elevate teachers.
              </p>
            </Reveal>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              <Reveal>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h3 className="font-semibold">Why partner with us</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Reach 1000+ students and 120+ teachers annually</li>
                    <li>
                      Demonstrable educational impact with credible reporting
                    </li>
                    <li>Brand visibility on stage, media and materials</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h3 className="font-semibold">Partnership opportunities</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Event sponsorship (headline, category)</li>
                    <li>Prizes and scholarships</li>
                    <li>Teacher awards and micro-grants</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h3 className="font-semibold">What you get</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Recognition across channels and on-site</li>
                    <li>Report on outcomes and impact</li>
                    <li>Opportunities to engage volunteers and staff</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-12">
              Current Partners
            </h2>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              {partners.map((p) => (
                <Reveal key={p.name}>
                  <a
                    href={(p as any).url || undefined}
                    target={p && (p as any).url ? "_blank" : undefined}
                    rel={p && (p as any).url ? "noreferrer" : undefined}
                    className="rounded-lg border bg-card p-6 md:p-8 flex items-center justify-center hover:shadow-md transition-shadow"
                  >
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-h-20 md:max-h-28 object-contain"
                    />
                  </a>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
              <Reveal>
                <div>
                  <h3 className="text-xl font-semibold">
                    Become a Strategy Partner
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Tell us about your organization and how you'd like to
                    collaborate. We’ll get back to you shortly.
                  </p>
                </div>
              </Reveal>
              <div className="rounded-2xl border bg-card/90 backdrop-blur p-6 shadow-lg ring-1 ring-border">
                <Reveal>
                  <RegistrationForm interest="partner" />
                </Reveal>
              </div>
            </div>

            <div className="mt-10">
              <Button asChild variant="outline">
                <a href="/contact">Contact us</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
