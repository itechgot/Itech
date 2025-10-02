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

  const getContent = () => {
    switch (interest) {
      case "volunteer":
        return {
          title: "Volunteer Application",
          subtitle: "Join our team to deliver an exceptional experience for students",
          description: "Help us make the 4th Igiehon Mathematics Tournament a success by volunteering your time and skills.",
          details: [
            "Flexible time commitments available",
            "Training and orientation provided",
            "Certificate of participation",
            "Networking opportunities",
            "Make a meaningful impact on education",
          ]
        };
      case "partner":
        return {
          title: "Partnership Inquiry",
          subtitle: "Partner with us to empower students and advance academic excellence",
          description: "Join us as a strategic partner to support mathematics education and student development in Edo State.",
          details: [
            "Multiple partnership opportunities available",
            "Brand visibility and recognition",
            "Corporate social responsibility impact",
            "Direct contribution to education",
            "Long-term partnership potential",
          ]
        };
      default:
        return {
          title: "Register for the 4th Igiehon Mathematics Tournament",
          subtitle: `Event: ${upcomingEvent.date} • Benin City, Edo State`,
          description: "Register your school team for the premier mathematics competition in Edo State.",
          details: [
            "Free registration",
            `Registration Window: ${upcomingEvent.registrationWindow}`,
            "Open to all Senior Secondary Schools in Edo State",
            "Teams consist of two (2) students from any class",
            "Teams must identify a teacher coach at registration",
            "Competition includes written test and oral segment",
          ]
        };
    }
  };

  const content = getContent();

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
                {content.title}
              </h1>
              <p className="text-muted-foreground mt-2">
                {content.subtitle}
              </p>
              <p className="mt-4 text-muted-foreground">
                {content.description}
              </p>
              <div className="mt-6 rounded-xl border bg-card p-5">
                <h3 className="font-semibold">
                  {interest === "event" ? "Eligibility Criteria" : 
                   interest === "volunteer" ? "What You Get" : "Partnership Benefits"}
                </h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {content.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
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
