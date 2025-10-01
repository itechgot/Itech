import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-16 md:py-24 prose prose-neutral max-w-3xl dark:prose-invert">
          <h1 className="!mb-2">Terms of Use</h1>
          <p className="text-muted-foreground !mt-0">Please review the following terms for participation and site use.</p>
          <h2>Participation</h2>
          <p>By registering, you affirm that participants meet eligibility criteria and that information provided is accurate.</p>
          <h2>Acceptable Use</h2>
          <p>Do not misuse the site or attempt to disrupt services. Respect community guidelines and event rules.</p>
          <h2>Liability</h2>
          <p>The organizers are not liable for indirect damages. Events may be modified or canceled due to unforeseen circumstances.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
