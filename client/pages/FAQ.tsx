import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mt-2">Answers to common questions about registration and the tournament.</p>
          <div className="mt-8 grid gap-6">
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold">Who can register?</h3>
              <p className="text-muted-foreground mt-2">Senior secondary schools in Edo State may register a team of two students with a teacher coach.</p>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold">Is there a fee?</h3>
              <p className="text-muted-foreground mt-2">Registration is free.</p>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold">What happens after submitting the form?</h3>
              <p className="text-muted-foreground mt-2">You will receive a confirmation on the page and an email follow-up if needed. Our team may contact you for verification or next steps.</p>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold">Can I volunteer or partner?</h3>
              <p className="text-muted-foreground mt-2">Yes. Use the volunteer or partnership interest options on the registration page or contact us via the contact page.</p>
            </div>
          </div>
          <div className="mt-10">
            <Link to="/register" className="text-primary underline">Back to registration</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
