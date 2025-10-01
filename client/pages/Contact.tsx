import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

export default function Contact() {
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
                  Contact
                </h1>
                <p className="mt-2 text-muted-foreground max-w-2xl">
                  We'd love to hear from you. Send a message and our team will
                  reply shortly.
                </p>
                <div className="mt-6 rounded-xl border bg-card p-6">
                  <h3 className="font-semibold">Contact Details</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>
                      Lagos Office: F19, Lekki Town Square Mall, Providence Road, Marwa, Lekki
                      Phase 1, Lagos
                    </li>
                    <li>Email: info@igiehonfoundation.org</li>
                  </ul>
                </div>
              </Reveal>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
