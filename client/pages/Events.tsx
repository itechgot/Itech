import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { upcomingEvent, pastEvents } from "@/data/content";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Events() {
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
                Events
              </h1>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Join the Igiehon Foundation for upcoming programs and the IMT
                2025 tournament.
              </p>
            </Reveal>

            <div className="mt-8 grid md:grid-cols-3 gap-6 items-stretch">
              <Reveal>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h3 className="text-xl font-semibold">
                    Upcoming: {upcomingEvent.title}
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    {upcomingEvent.date} • {upcomingEvent.venue}
                  </p>
                  <ul className="mt-4 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>
                      Registration Window: {upcomingEvent.registrationWindow}
                    </li>
                    <li>Initial Round: Written test</li>
                    <li>Finals: Oral segment</li>
                  </ul>
                  <div className="mt-6">
                    <Button
                      asChild
                      className="brand-gradient text-primary-foreground"
                    >
                      <Link to="/register">Register your school</Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h4 className="font-semibold">Schedule (Indicative)</h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>08:30 — Arrival & Check-in</li>
                    <li>09:30 — Opening Ceremony</li>
                    <li>10:00 — Written Round</li>
                    <li>12:30 — Lunch Break</li>
                    <li>14:00 — Oral Finals</li>
                    <li>16:00 — Awards & Closing</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h4 className="font-semibold">Eligibility at a Glance</h4>
                  <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Senior Secondary Schools in Edo State</li>
                    <li>Two students per team + a teacher coach</li>
                    <li>Current SS students only</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-12">
              Past Events
            </h2>
            <div className="mt-6">
              <Reveal>
                <div className="relative">
                  <Carousel opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                      {pastEvents.map((e) => (
                        <CarouselItem
                          key={e.title}
                          className="md:basis-1/2 lg:basis-1/3"
                        >
                          <div className="group overflow-hidden rounded-2xl border bg-card">
                            <div className="aspect-[16/10] overflow-hidden">
                              <img
                                src={e.image}
                                alt={e.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="p-4">
                              <div className="text-sm text-muted-foreground">
                                {e.date}
                              </div>
                              <div className="font-semibold">{e.title}</div>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-6" />
                    <CarouselNext className="-right-6" />
                  </Carousel>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
