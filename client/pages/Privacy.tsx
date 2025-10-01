import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-16 md:py-24 prose prose-neutral max-w-3xl dark:prose-invert">
          <h1 className="!mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground !mt-0">We respect your privacy and handle your information responsibly.</p>
          <h2>Information We Collect</h2>
          <p>We collect details you provide during registration or contact, such as names, emails, phone numbers, and school details. This information is used to manage event participation and communication.</p>
          <h2>How We Use Information</h2>
          <ul>
            <li>Process registrations and manage event logistics</li>
            <li>Communicate updates, confirmations, and next steps</li>
            <li>Improve our programs and community engagement</li>
          </ul>
          <h2>Data Retention</h2>
          <p>We retain information only as long as necessary for the purposes above or to meet legal obligations.</p>
          <h2>Your Choices</h2>
          <p>You may request corrections or deletion of your information by contacting us at info@igiehonfoundation.org.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
