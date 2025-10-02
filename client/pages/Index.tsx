import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/RegistrationForm";
import {
  impactStats,
  pastEvents,
  partners,
  upcomingEvent,
} from "@/data/content";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Reveal } from "@/components/Reveal";

const heroImg =
  "https://igiehonfoundation.org/assets/images/students-696x759.webp";
const logoUrl = "https://igiehonfoundation.org/assets/images/IFnewicon.jpg";

export default function Index() {
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
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Students"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/60 to-background" />
        </div>
        <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logoUrl}
                alt="Igiehon Foundation"
                className="h-10 w-10 rounded"
              />
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">
                Igiehon Foundation
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Empowering Minds. Inspiring Excellence.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              The Igiehon Mathematics Tournament is a high-impact competition
              for senior secondary schools in Edo State, celebrating intellect
              and creativity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="brand-gradient text-primary-foreground"
              >
                <Link to="/register">Register Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#impact">Our Impact</a>
              </Button>
            </div>
            <div className="mt-8 rounded-lg border p-4 bg-card/60">
              <p className="text-sm text-muted-foreground">Upcoming Event</p>
              <p className="mt-1 font-semibold">{upcomingEvent.title}</p>
              <p className="mt-1">{upcomingEvent.date}</p>
              <p className="text-sm mt-1">
                Registration Window: {upcomingEvent.registrationWindow}
              </p>
            </div>
          </div>
          <div className="md:justify-self-end">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border">
                <img
                  src={heroImg}
                  alt="Igiehon Tournament"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="container py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Impact
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Backed by the Igiehon Foundation for Academic Excellence, IMT brings
          together schools across Edo State for a world-class challenge.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactStats.map((s) => (
            <Reveal key={s.label}>
              <div className="rounded-xl border bg-card p-6 text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-primary">
                  {s.value.toLocaleString()}
                  {(s as any).plus ? "+" : ""}
                </div>
                <div className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="relative border-y">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(hsl(var(--brand-gold))/0.15_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container py-16 md:py-24 space-y-12">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Register for the 4th Igiehon Mathematics Tournament
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Event: {upcomingEvent.date} • Benin City, Edo State
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                <span>Free registration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                <span>Open to senior secondary schools in Edo State</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                <span>Registration Window: {upcomingEvent.registrationWindow}</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Prize Pool Card */}
            <div className="rounded-2xl border bg-gradient-to-br from-brand-gold/5 via-card to-primary/5 p-8 shadow-lg ring-1 ring-border/50">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-brand-gold mb-2">Prize Pool</h3>
                <p className="text-muted-foreground">Rewarding academic excellence</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-card/80 border border-brand-gold/20">
                  <div className="text-sm font-medium text-brand-gold mb-1">1st Place</div>
                  <div className="text-2xl font-extrabold">₦1,000,000</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-card/80 border border-brand-gold/20">
                  <div className="text-sm font-medium text-brand-gold mb-1">2nd Place</div>
                  <div className="text-2xl font-extrabold">₦750,000</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-card/80 border border-brand-gold/20">
                  <div className="text-sm font-medium text-brand-gold mb-1">3rd Place</div>
                  <div className="text-2xl font-extrabold">₦500,000</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button asChild variant="secondary" className="w-full">
                  <a href="#volunteer">Volunteer</a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href="#partners">Become a Partner</a>
                </Button>
              </div>
            </div>

            {/* Registration Form Card */}
            <div className="rounded-2xl border bg-card/90 backdrop-blur p-8 shadow-lg ring-1 ring-border">
              <RegistrationForm interest="event" />
            </div>
          </div>

          {/* Eligibility Criteria - Full Width Section */}
          <div className="rounded-2xl border bg-card/50 backdrop-blur">
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Eligibility Criteria</h3>
                <p className="text-muted-foreground">Requirements for participation in the tournament</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card/80 border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-brand-gold mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-1">School Eligibility</h4>
                    <p className="text-sm text-muted-foreground">Open to all Senior Secondary Schools in Edo State</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card/80 border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-brand-gold mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-1">Student Requirements</h4>
                    <p className="text-sm text-muted-foreground">All participants must be current Senior Secondary Students</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card/80 border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-brand-gold mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-1">Team Composition</h4>
                    <p className="text-sm text-muted-foreground">Teams consist of two (2) students from any class or department</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card/80 border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-brand-gold mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-1">Teacher Coach</h4>
                    <p className="text-sm text-muted-foreground">Teams must identify a teacher coach at registration</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card/80 border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-brand-gold mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-1">Competition Format</h4>
                    <p className="text-sm text-muted-foreground">Competition includes written test (Initial Round) and oral segment (Finals)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card/80 border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-brand-gold mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-1">Awards</h4>
                    <p className="text-sm text-muted-foreground">Laptops awarded to top 3 individual students, consolation prizes for top 10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="container py-16 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Past Events
            </h2>
            <p className="text-muted-foreground mt-2">
              Highlights from previous tournaments.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/events">View all</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-3">
          {pastEvents.map((e) => (
            <Reveal key={e.title}>
              <div className="group overflow-hidden rounded-2xl border bg-card">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={e.image}
                    alt={e.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm text-muted-foreground">{e.date}</div>
                  <div className="font-semibold">{e.title}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Executive Leadership moved to About page */}

      {/* Partners */}
      <section id="partners" className="container py-16 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Strategy Partners
            </h2>
            <p className="text-muted-foreground mt-2">
              We invite organizations to partner in empowering students.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/partners">Partner with us</Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
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
      </section>

      {/* Volunteer CTA */}
      <section
        id="volunteer"
        className="border-t bg-primary text-primary-foreground"
      >
        <div className="container py-14 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Volunteer Intake • 2025
            </h3>
            <p className="text-primary-foreground/90 mt-1">
              Join our team to deliver an exceptional experience for students.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link to="/register?interest=volunteer">Apply to Volunteer</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
