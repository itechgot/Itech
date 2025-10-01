import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Trophy,
  Users,
  GraduationCap,
  Beaker,
  BookOpenCheck,
  HeartHandshake,
} from "lucide-react";

const programs = [
  {
    icon: Trophy,
    title: "Igiehon Mathematics Tournament (IMT)",
    description:
      "Flagship annual competition for Senior Secondary Schools across Edo State — written round and oral finals.",
    cta: { label: "Register a school", to: "/register" },
  },
  {
    icon: Users,
    title: "Teacher Excellence Awards",
    description:
      "Recognizing and empowering impactful teachers through awards, micro-grants and professional support.",
    cta: { label: "Nominate a teacher", to: "/contact" },
  },
  {
    icon: GraduationCap,
    title: "Scholarships & Recognition",
    description:
      "Scholarships and recognition for outstanding students to accelerate achievement and opportunity.",
    cta: { label: "Learn more", to: "/contact" },
  },
  {
    icon: BookOpenCheck,
    title: "STEM Clubs & Mentorship",
    description:
      "After-school clubs, resources and mentorship to cultivate problem solving, creativity and leadership.",
    cta: { label: "Start a club", to: "/contact" },
  },
  {
    icon: HeartHandshake,
    title: "Community Outreach",
    description:
      "Partnership programs with communities and NGOs to broaden access and participation.",
    cta: { label: "Become a partner", to: "/partners" },
  },
  {
    icon: Beaker,
    title: "Innovation & Research",
    description:
      "Piloting new approaches to learning and assessment, sharing insights for systemic improvement.",
    cta: { label: "Collaborate", to: "/contact" },
  },
];

export default function Programs() {
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
                Programs
              </h1>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                We promote excellence by inspiring students and empowering
                teachers through targeted, high-impact programs.
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs.map((p) => (
                <Reveal key={p.title}>
                  <div className="rounded-2xl border bg-card p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3">
                      <p.icon className="h-6 w-6 text-primary" />
                      <h3 className="font-semibold text-lg">{p.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground flex-1">
                      {p.description}
                    </p>
                    <div className="mt-4">
                      <Button asChild variant="outline">
                        <Link to={p.cta.to}>{p.cta.label}</Link>
                      </Button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Reveal>
                <div className="rounded-2xl border bg-card p-6">
                  <h4 className="font-semibold">Partner with us</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    We invite strategic partners to co-create programs and scale
                    impact.
                  </p>
                  <div className="mt-4">
                    <Button
                      asChild
                      className="brand-gradient text-primary-foreground"
                    >
                      <Link to="/partners">Become a Partner</Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="rounded-2xl border bg-card p-6">
                  <h4 className="font-semibold">Volunteer</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Join our volunteer network to support events, mentorship and
                    logistics.
                  </p>
                  <div className="mt-4">
                    <Button asChild variant="secondary">
                      <Link to="/volunteer">Volunteer Now</Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="rounded-2xl border bg-card p-6">
                  <h4 className="font-semibold">Contact</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Have a program idea or wish to collaborate? We’d love to
                    talk.
                  </p>
                  <div className="mt-4">
                    <Button asChild variant="outline">
                      <Link to="/contact">Get in Touch</Link>
                    </Button>
                  </div>
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
