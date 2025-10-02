import { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const availabilityOptions = [
  { value: "setup", label: "Event Setup (Day Before)" },
  { value: "morning", label: "Morning Session" },
  { value: "afternoon", label: "Afternoon Session" },
  { value: "cleanup", label: "Event Cleanup" },
] as const;

const skillsOptions = [
  { value: "registration", label: "Registration & Check-in" },
  { value: "crowd_control", label: "Crowd Control & Guidance" },
  { value: "technical", label: "Technical Support" },
  { value: "photography", label: "Photography/Videography" },
  { value: "logistics", label: "Logistics & Coordination" },
  { value: "first_aid", label: "First Aid" },
  { value: "other", label: "Other" },
] as const;

const volunteerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  age: z.string().min(1, "Age is required"),
  occupation: z.string().optional(),
  experience: z.enum(["first_time", "some_experience", "very_experienced"], { required_error: "Please select your experience level" }),
  availability: z.array(z.enum(availabilityOptions.map(o => o.value) as ["setup","morning","afternoon","cleanup"])).min(1, "Please select at least one availability option"),
  skills: z.array(z.enum(skillsOptions.map(o => o.value) as ["registration","crowd_control","technical","photography","logistics","first_aid","other"])).optional(),
  skillsOther: z.string().optional(),
  motivation: z.string().min(10, "Please tell us why you want to volunteer"),
  emergencyContact: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(7, "Emergency contact phone is required"),
  notes: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.skills?.includes("other") && !data.skillsOther?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["skillsOther"], message: "Please specify your other skills" });
  }
});

export function VolunteerRegistrationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof volunteerSchema>>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      age: "",
      occupation: "",
      experience: undefined,
      availability: [],
      skills: [],
      skillsOther: "",
      motivation: "",
      emergencyContact: "",
      emergencyPhone: "",
      notes: "",
    },
  });

  const steps = [
    { key: "personal", label: "Personal Info" },
    { key: "experience", label: "Experience" },
    { key: "availability", label: "Availability" },
    { key: "emergency", label: "Emergency Contact" },
    { key: "review", label: "Review" },
  ];

  const current = steps[step];
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const next = async () => {
    const fieldsByStep: Record<string, (keyof z.infer<typeof volunteerSchema>)[]> = {
      personal: ["fullName", "email", "phone", "age", "occupation"],
      experience: ["experience", "skills", "skillsOther", "motivation"],
      availability: ["availability"],
      emergency: ["emergencyContact", "emergencyPhone", "notes"],
      review: [],
    };

    const fields = fieldsByStep[current.key];
    const ok = await form.trigger(fields as any, { shouldFocus: true });
    if (!ok) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  async function onSubmit(values: z.infer<typeof volunteerSchema>) {
    const WEB3FORMS_KEY = "dfeaba57-2dc1-45e1-8c31-9d75f2823e10";
    const subject = "Volunteer Application - IMT 2025";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: "Igiehon Foundation Website",
          reply_to: values.email,
          ...values,
        }),
      });

      const data = await res.json();
      if (data?.success) {
        toast.success("Volunteer application submitted successfully! We will contact you shortly.");
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
            <h3 className="text-2xl font-bold">Application Received</h3>
            <p className="text-muted-foreground mt-2">Thank you for your interest in volunteering! We will review your application and contact you with next steps.</p>
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
              <h3 className="text-lg font-semibold">Volunteer Application</h3>
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

            {/* Step 1: Personal Info */}
            {current.key === "personal" && (
              <div className="space-y-4">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+234..." {...field} />
                      </FormControl>
                      <FormDescription>WhatsApp preferred if available.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="occupation" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your profession or field of study" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>
            )}

            {/* Step 2: Experience */}
            {current.key === "experience" && (
              <div className="space-y-4">
                <FormField control={form.control} name="experience" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volunteer Experience</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="first_time">First time volunteering</SelectItem>
                        <SelectItem value="some_experience">Some volunteer experience</SelectItem>
                        <SelectItem value="very_experienced">Very experienced volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="skills" render={() => (
                  <FormItem>
                    <FormLabel>Skills & Interests (Select all that apply)</FormLabel>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {skillsOptions.map((opt) => (
                        <FormField key={opt.value} control={form.control} name="skills" render={({ field }) => {
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

                {form.watch("skills")?.includes("other") && (
                  <FormField control={form.control} name="skillsOther" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify your other skills</FormLabel>
                      <FormControl>
                        <Input placeholder="Describe your other relevant skills" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}

                <FormField control={form.control} name="motivation" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why do you want to volunteer with us?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us what motivates you to volunteer for the Igiehon Mathematics Tournament..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            )}

            {/* Step 3: Availability */}
            {current.key === "availability" && (
              <div className="space-y-4">
                <FormField control={form.control} name="availability" render={() => (
                  <FormItem>
                    <FormLabel>When are you available? (Select all that apply)</FormLabel>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {availabilityOptions.map((opt) => (
                        <FormField key={opt.value} control={form.control} name="availability" render={({ field }) => {
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
              </div>
            )}

            {/* Step 4: Emergency Contact */}
            {current.key === "emergency" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="emergencyContact" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact person's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="emergencyPhone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+234..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="notes" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any additional information you'd like to share..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            )}

            {/* Step 5: Review */}
            {current.key === "review" && (
              <div className="space-y-4">
                <h4 className="font-semibold">Review Your Application</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Name:</span>
                    <span>{form.watch("fullName")}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Email:</span>
                    <span>{form.watch("email")}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Phone:</span>
                    <span>{form.watch("phone")}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Experience:</span>
                    <span>{form.watch("experience")?.replace("_", " ")}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Availability:</span>
                    <span>{form.watch("availability")?.join(", ")}</span>
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
            <Button type="submit">
              Submit Application
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}