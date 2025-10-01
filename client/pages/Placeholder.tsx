import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-20">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            This page is a placeholder. Tell us what you want here and we will build it to your exact needs.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
