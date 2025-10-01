import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/Reveal";
import { patrons, team } from "@/data/content";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const whatWeDo = [
  {
    title: "Academic Support",
    description:
      "Providing resources and support to secondary school students and teachers to enhance learning outcomes.",
  },
  {
    title: "Math Tournament",
    description:
      "Annual mathematics competition bringing together the brightest minds from across Edo State.",
  },
  {
    title: "Community Building",
    description:
      "Creating networks of educators and students passionate about academic excellence and growth.",
  },
];

export default function About() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    try {
      const id = location.hash.replace(/^#/, "").split("?")[0];
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      // ignore invalid hash
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(hsl(var(--brand-gold))/0.12_1px,transparent_1px)] [background-size:24px_24px]" />
      <Header />
      <main className="flex-1">
        <section className="relative">
          <div className="container py-16 md:py-24">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                About Igiehon Foundation
              </h1>
              <p className="mt-3 text-muted-foreground max-w-2xl">
                In pursuit of excellence & heritage — empowering students and
                elevating educators through recognition, opportunity and
                community.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Reveal>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h3 className="text-xl font-semibold">Our Vision</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    To build a lasting legacy of promoting academic excellence,
                    with the recognition and empowerment of talent, achievement
                    and innovation.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h3 className="text-xl font-semibold">Our Mission</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    At the Igiehon Foundation, we are dedicated to transforming
                    lives through promotion of educational excellence. By
                    inspiring talented students and empowering impactful teachers,
                    we reinforce the centrality of education as the fundamental
                    vehicle for individual and societal transformation.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h3 className="text-xl font-semibold">Core Values</h3>
                  <ul className="mt-2 text-sm text-muted-foreground space-y-1 list-disc pl-5">
                    <li>Promote: Excellence and Recognition</li>
                    <li>With: Integrity, Respect, Service and Collaboration</li>
                    <li>Whilst ensuring: Stewardship, Inclusion and Sustainability</li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="what-we-do" className="container py-12 md:py-20">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              What We Do
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Programs and initiatives that advance academic excellence and
              opportunity.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatWeDo.map((item) => (
              <Reveal key={item.title}>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="executive-leadership" className="bg-muted/30 border-y">
          <div className="container py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Executive Leadership
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:max-w-5xl mx-auto">
              {patrons.map((p) => (
                <Reveal key={p.name}>
                  <div className="rounded-xl border bg-card overflow-hidden max-w-sm mx-auto">
                    <div
                      className={
                        p.role === "Chairperson"
                          ? "h-64 w-full bg-muted/20"
                          : "h-56 w-full bg-muted/20"
                      }
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className={
                          p.role === "Chairperson"
                            ? "h-full w-full object-contain p-2"
                            : "h-full w-full object-cover object-top"
                        }
                        style={
                          p.role === "Chairperson"
                            ? { objectPosition: "center top" }
                            : undefined
                        }
                      />
                    </div>
                    <div className="p-4">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {p.role}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {team.length > 0 && (
              <>
                <h3 className="text-2xl font-bold tracking-tight mt-12">Lead Team</h3>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {team.map((m) => (
                    <Reveal key={m.name}>
                      <div className="rounded-2xl border bg-card overflow-hidden">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={m.image}
                            alt={m.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-5">
                          <div className="font-semibold">{m.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {m.role}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
