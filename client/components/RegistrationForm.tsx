import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { upcomingEvent } from "@/data/content";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const heardOptions = [
  { value: "email", label: "Email Invitation" },
  { value: "sms", label: "Bulk SMS" },
  { value: "social", label: "Social Media" },
  { value: "radio", label: "Radio Jingle" },
  { value: "other", label: "Other" },
] as const;

const baseSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  role: z.enum(["student", "teacher", "parent", "volunteer", "partner", "other"], { required_error: "Select a role" }),
  interest: z.enum(["event", "volunteer", "partner"]).optional(),
  schoolName: z.string().min(2, "School name is required"),
  schoolAddress: z.string().min(5, "School address is required"),
  student1Name: z.string().optional(),
  student1Email: z.string().email().optional(),
  student1Phone: z.string().optional(),
  student2Name: z.string().optional(),
  student2Email: z.string().email().optional(),
  student2Phone: z.string().optional(),
  heardAbout: z.array(z.enum(heardOptions.map(o => o.value) as ["email","sms","social","radio","other"])).optional(),
  heardAboutOther: z.string().optional(),
  notes: z.string().optional(),
});

const schema = baseSchema.superRefine((data, ctx) => {
  const isEvent = !data.interest || data.interest === "event";
  if (isEvent) {
    const req = [
      ["student1Name", data.student1Name],
      ["student1Email", data.student1Email],
      ["student1Phone", data.student1Phone],
      ["student2Name", data.student2Name],
      ["student2Email", data.student2Email],
      ["student2Phone", data.student2Phone],
    ] as const;
    for (const [key, val] of req) {
      if (!val || String(val).trim().length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: [key], message: "Required" });
      }
    }
  }
  if (data.heardAbout?.includes("other") && !data.heardAboutOther?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["heardAboutOther"], message: "Please specify" });
  }
});

export function RegistrationForm({
  interest,
}: {
  interest?: "event" | "volunteer" | "partner";
}) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      role: "other",
      interest,
      schoolName: "",
      schoolAddress: "",
      student1Name: "",
      student1Email: "",
      student1Phone: "",
      student2Name: "",
      student2Email: "",
      student2Phone: "",
      heardAbout: [],
      heardAboutOther: "",
      notes: "",
    },
  });

  const isEvent = !form.watch("interest") || form.watch("interest") === "event";

  const steps = useMemo(() => {
    const v = [
      { key: "contact", label: "Contact" },
      { key: "school", label: "School" },
      ...(isEvent ? [{ key: "students", label: "Students" }] : []),
      { key: "additional", label: "Additional" },
      { key: "review", label: "Review" },
    ];
    return v;
  }, [isEvent]);

  const current = steps[step];
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const next = async () => {
    const fieldsByStep: Record<string, (keyof z.infer<typeof schema>)[]> = {
      contact: ["fullName", "email", "phone", "role", "interest"],
      school: ["schoolName", "schoolAddress", "organization"],
      students: [
        "student1Name",
        "student1Email",
        "student1Phone",
        "student2Name",
        "student2Email",
        "student2Phone",
      ],
      additional: ["heardAbout", "heardAboutOther", "notes"],
      review: [],
    };

    const fields = fieldsByStep[current.key];
    const ok = await form.trigger(fields as any, { shouldFocus: true });
    if (!ok) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  async function onSubmit(values: z.infer<typeof schema>) {
    const { isBeforeStart, isAfterEnd } = (() => {
      const now = new Date();
      const start = new Date(upcomingEvent.registrationStart);
      const end = new Date(upcomingEvent.registrationEnd);
      return { isBeforeStart: now < start, isAfterEnd: now > end };
    })();

    if ((isBeforeStart || isAfterEnd) && isEvent) {
      toast.warning(`Registration is only open from ${upcomingEvent.registrationWindow}.`);
      return;
    }

    const WEB3FORMS_KEY = "dfeaba57-2dc1-45e1-8c31-9d75f2823e10";
    const subject = values.interest === "volunteer" ? "Volunteer Intake" : values.interest === "partner" ? "Strategy Partner Interest" : "IMT 2025 Registration";

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject,
        from_name: "Igiehon Foundation Website",
        reply_to: values.email,
        ...values,
      } satisfies Record<string, unknown>),
    });

    const data = (await res.json()) as { success?: boolean; message?: string };
    if (data?.success) {
      toast.success("Thank you! Your submission was received.");
      setSubmitted(true);
      form.reset({ ...form.getValues(), heardAbout: [] });
    } else {
      toast.error(data?.message || "Submission failed");
    }
  }

  if (submitted) {
    return (
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
          <div className="rounded-xl border bg-card p-6 text-center">
            <h3 className="text-2xl font-bold">Registration Received</h3>
            <p className="text-muted-foreground mt-2">We will reach out with next steps. You can review common questions below.</p>
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Step {step + 1} of {steps.length}</div>
            <div className="text-sm text-muted-foreground">{progress}%</div>
          </div>
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">Location: Benin City, Edo State</p>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {steps.map((s, i) => (
              <span key={s.key} className={`px-2 py-1 rounded ${i === step ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>{s.label}</span>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {current.key === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+234..." {...field} />
                  </FormControl>
                  <FormDescription>WhatsApp preferred if available.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem>
                  <FormLabel>Your role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

            </motion.div>
          )}

          {current.key === "school" && (
            <motion.div key="school" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="schoolName" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your School" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="schoolAddress" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>School Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="organization" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>School / Organization (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization name (if different)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </motion.div>
          )}

          {current.key === "students" && isEvent && (
            <motion.div key="students" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 mt-2">
                <h4 className="font-semibold">Students Representing the School</h4>
                <p className="text-sm text-muted-foreground">Provide names, emails, and phone numbers of the two students.</p>
              </div>

              <FormField control={form.control} name="student1Name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Student 1 Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Student 1 full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="student1Email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Student 1 Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="student1@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="student1Phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Student 1 Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+234..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="student2Name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Student 2 Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Student 2 full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="student2Email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Student 2 Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="student2@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="student2Phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Student 2 Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+234..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </motion.div>
          )}

          {current.key === "additional" && (
            <motion.div key="additional" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 gap-4">
              <FormField control={form.control} name="heardAbout" render={() => (
                <FormItem>
                  <FormLabel>How did you get the information about the competition?</FormLabel>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {heardOptions.map((opt) => (
                      <FormField key={opt.value} control={form.control} name="heardAbout" render={({ field }) => {
                        const checked = (field.value || []).includes(opt.value);
                        return (
                          <FormItem className="flex items-center gap-3 space-y-0 border rounded-md p-3">
                            <FormControl>
                              <Checkbox
                                checked={checked}
                                onCheckedChange={(v) => {
                                  const arr = new Set(field.value || []);
                                  if (v) arr.add(opt.value); else arr.delete(opt.value);
                                  field.onChange(Array.from(arr));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="!m-0 !text-sm">{opt.label}</FormLabel>
                          </FormItem>
                        );
                      }} />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )} />

              {form.watch("heardAbout")?.includes("other") && (
                <FormField control={form.control} name="heardAboutOther" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please specify</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., School counselor, friends, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              )}

              <FormField control={form.control} name="notes" render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Tell us more..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </motion.div>
          )}

          {current.key === "review" && (
            <motion.div key="review" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3 text-sm">
              <p className="text-muted-foreground">Please review your information before submitting.</p>
              <div className="rounded-md border p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><span className="font-medium">Full Name:</span> {form.getValues("fullName")}</div>
                <div><span className="font-medium">Email:</span> {form.getValues("email")}</div>
                <div><span className="font-medium">Phone:</span> {form.getValues("phone")}</div>
                <div><span className="font-medium">Role:</span> {form.getValues("role")}</div>
                <div><span className="font-medium">Interest:</span> {form.getValues("interest") || "event"}</div>
                <div><span className="font-medium">School:</span> {form.getValues("schoolName")}</div>
                <div className="md:col-span-2"><span className="font-medium">Address:</span> {form.getValues("schoolAddress")}</div>
                {isEvent && (
                  <>
                    <div className="md:col-span-2 font-medium">Students</div>
                    <div><span className="font-medium">Student 1:</span> {form.getValues("student1Name")}, {form.getValues("student1Email")} ({form.getValues("student1Phone")})</div>
                    <div><span className="font-medium">Student 2:</span> {form.getValues("student2Name")}, {form.getValues("student2Email")} ({form.getValues("student2Phone")})</div>
                  </>
                )}
                <div className="md:col-span-2"><span className="font-medium">How you heard:</span> {(form.getValues("heardAbout") || []).join(", ")}{form.getValues("heardAboutOther") ? `; ${form.getValues("heardAboutOther")}` : ""}</div>
                <div className="md:col-span-2"><span className="font-medium">Notes:</span> {form.getValues("notes")}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between gap-3">
          <Button type="button" variant="outline" onClick={back} disabled={step === 0}>Back</Button>
          {step < steps.length - 1 ? (
            <Button type="button" onClick={next} className="ml-auto">Next</Button>
          ) : (
            <Button type="submit" className="ml-auto">Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
