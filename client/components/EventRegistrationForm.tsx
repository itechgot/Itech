import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const eventSchema = z.object({
  teacherCoachName: z.string().min(2, "Teacher coach name is required"),
  teacherCoachEmail: z.string().email("Valid email is required"),
  teacherCoachPhone: z.string().min(7, "Phone number is required"),
  schoolName: z.string().min(2, "School name is required"),
  schoolAddress: z.string().min(5, "School address is required"),
  student1Name: z.string().min(2, "Student 1 name is required"),
  student1Email: z.string().email("Valid email is required"),
  student1Phone: z.string().min(7, "Phone number is required"),
  student2Name: z.string().min(2, "Student 2 name is required"),
  student2Email: z.string().email("Valid email is required"),
  student2Phone: z.string().min(7, "Phone number is required"),
  heardAbout: z.array(z.enum(heardOptions.map(o => o.value) as ["email","sms","social","radio","other"])).optional(),
  heardAboutOther: z.string().optional(),
  notes: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.heardAbout?.includes("other") && !data.heardAboutOther?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["heardAboutOther"], message: "Please specify" });
  }
});

export function EventRegistrationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      teacherCoachName: "",
      teacherCoachEmail: "",
      teacherCoachPhone: "",
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

  const steps = [
    { key: "coach", label: "Teacher Coach" },
    { key: "school", label: "School Info" },
    { key: "students", label: "Students" },
    { key: "additional", label: "Additional" },
    { key: "review", label: "Review" },
  ];

  const current = steps[step];
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const next = async () => {
    const fieldsByStep: Record<string, (keyof z.infer<typeof eventSchema>)[]> = {
      coach: ["teacherCoachName", "teacherCoachEmail", "teacherCoachPhone"],
      school: ["schoolName", "schoolAddress"],
      students: [
        "student1Name", "student1Email", "student1Phone",
        "student2Name", "student2Email", "student2Phone",
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

  async function onSubmit(values: z.infer<typeof eventSchema>) {
    const { isBeforeStart, isAfterEnd } = (() => {
      const now = new Date();
      const start = new Date(upcomingEvent.registrationStart);
      const end = new Date(upcomingEvent.registrationEnd);
      return { isBeforeStart: now < start, isAfterEnd: now > end };
    })();

    if (isBeforeStart || isAfterEnd) {
      toast.warning(`Registration is only open from ${upcomingEvent.registrationWindow}.`);
      return;
    }

    const WEB3FORMS_KEY = "dfeaba57-2dc1-45e1-8c31-9d75f2823e10";
    const subject = "IMT 2025 Event Registration";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: "Igiehon Foundation Website",
          reply_to: values.teacherCoachEmail,
          ...values,
        }),
      });

      const data = await res.json();
      if (data?.success) {
        toast.success("Registration submitted successfully! We will contact you shortly.");
        setSubmitted(true);
        form.reset();
      } else {
        toast.error(data?.message || "Submission failed. Please try again.");
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
          <p className="text-xs text-muted-foreground">Event Registration • {upcomingEvent.date} • Benin City, Edo State</p>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {steps.map((s, i) => (
              <span key={s.key} className={`px-2 py-1 rounded ${i === step ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>{s.label}</span>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {current.key === "coach" && (
            <motion.div key="coach" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="teacherCoachName" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Teacher Coach Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Teacher's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="teacherCoachEmail" render={({ field }) => (
                <FormItem>
                  <FormLabel>Teacher Coach Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="teacher@school.edu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="teacherCoachPhone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Teacher Coach Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+234..." {...field} />
                  </FormControl>
                  <FormDescription>WhatsApp preferred if available</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
            </motion.div>
          )}

          {current.key === "school" && (
            <motion.div key="school" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 gap-4">
              <FormField control={form.control} name="schoolName" render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full school name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="schoolAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>School Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Complete school address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </motion.div>
          )}

          {current.key === "students" && (
            <motion.div key="students" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold">Students Representing the School</h4>
                <p className="text-sm text-muted-foreground mt-1">Provide details for both students participating in the tournament.</p>
              </div>

              {/* Student 1 Section */}
              <div className="rounded-lg border bg-card/50 p-4 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</div>
                  <h5 className="font-medium">First Student</h5>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="student1Name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Student's full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="student1Email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="student@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="student1Phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+234..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>

              {/* Student 2 Section */}
              <div className="rounded-lg border bg-card/50 p-4 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">2</div>
                  <h5 className="font-medium">Second Student</h5>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="student2Name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Student's full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="student2Email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="student@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="student2Phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+234..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>
            </motion.div>
          )}

          {current.key === "additional" && (
            <motion.div key="additional" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 gap-4">
              <FormField control={form.control} name="heardAbout" render={() => (
                <FormItem>
                  <FormLabel>How did you hear about the competition?</FormLabel>
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
                      <Input placeholder="How did you hear about us?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              )}

              <FormField control={form.control} name="notes" render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any additional information or questions..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </motion.div>
          )}

          {current.key === "review" && (
            <motion.div key="review" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <h4 className="font-semibold">Review Your Registration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div><strong>Teacher Coach:</strong> {form.watch("teacherCoachName")}</div>
                  <div><strong>Email:</strong> {form.watch("teacherCoachEmail")}</div>
                  <div><strong>Phone:</strong> {form.watch("teacherCoachPhone")}</div>
                </div>
                <div className="space-y-2">
                  <div><strong>School:</strong> {form.watch("schoolName")}</div>
                  <div><strong>Address:</strong> {form.watch("schoolAddress")}</div>
                </div>
                <div className="space-y-2">
                  <div><strong>Student 1:</strong> {form.watch("student1Name")}</div>
                  <div><strong>Student 2:</strong> {form.watch("student2Name")}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between pt-4">
          <Button type="button" variant="outline" onClick={back} disabled={step === 0}>
            Previous
          </Button>
          {step < steps.length - 1 ? (
            <Button type="button" onClick={next}>
              Next
            </Button>
          ) : (
            <Button type="submit">
              Submit Registration
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}