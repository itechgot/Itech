import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { ContactPayload, ContactResponse } from "@shared/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message is too short"),
});

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const steps = [
    { key: "contact", label: "Contact Info" },
    { key: "message", label: "Your Message" },
    { key: "review", label: "Review" },
  ];

  const current = steps[step];
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const next = async () => {
    const fieldsByStep: Record<string, (keyof z.infer<typeof schema>)[]> = {
      contact: ["name", "email"],
      message: ["subject", "message"],
      review: [],
    };

    const fields = fieldsByStep[current.key];
    const ok = await form.trigger(fields as any, { shouldFocus: true });
    if (!ok) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  async function onSubmit(values: z.infer<typeof schema>) {
    const WEB3FORMS_KEY = "dfeaba57-2dc1-45e1-8c31-9d75f2823e10";
    
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: values.subject,
          from_name: "Igiehon Foundation Website",
          reply_to: values.email,
          ...values,
        }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (data?.success) {
        toast.success("Message sent. We'll be in touch.");
        setSubmitted(true);
        form.reset();
      } else {
        toast.error(data?.message || "Failed to send");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
    }
  }

  if (submitted) {
    return (
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
          <div className="rounded-xl border bg-card p-6 text-center">
            <h3 className="text-2xl font-bold">Message Sent!</h3>
            <p className="text-muted-foreground mt-2">Thank you for contacting us. We'll get back to you shortly.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <Link to="/faq">Read FAQ</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <p className="text-sm text-muted-foreground">Step {step + 1} of {steps.length}: {current.label}</p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Step 1: Contact Info */}
            {current.key === "contact" && (
              <div className="space-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Message */}
            {current.key === "message" && (
              <div className="space-y-4">
                <FormField
                  name="subject"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What is this about?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="message"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea rows={6} placeholder="How can we help you?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: Review */}
            {current.key === "review" && (
              <div className="space-y-4">
                <h4 className="font-semibold">Review Your Message</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Name:</span>
                    <span>{form.watch("name")}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Email:</span>
                    <span>{form.watch("email")}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Subject:</span>
                    <span>{form.watch("subject")}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-medium">Message:</span>
                    <p className="text-muted-foreground">{form.watch("message")}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={back}
            disabled={step === 0}
          >
            Previous
          </Button>
          
          {step < steps.length - 1 ? (
            <Button type="button" onClick={next}>
              Next
            </Button>
          ) : (
            <Button type="submit" className="brand-gradient text-primary-foreground">
              Send Message
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
