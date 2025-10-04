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
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const organizationTypes = [
  { value: "corporate", label: "Corporate/Business" },
  { value: "educational", label: "Educational Institution" },
  { value: "nonprofit", label: "Non-profit Organization" },
  { value: "government", label: "Government Agency" },
  { value: "foundation", label: "Foundation/Grant Organization" },
  { value: "other", label: "Other" },
] as const;

const partnershipInterests = [
  { value: "financial_sponsorship", label: "Financial Sponsorship" },
  { value: "prize_donation", label: "Prize/Award Donation" },
  { value: "venue_support", label: "Venue Support" },
  { value: "marketing_support", label: "Marketing & Promotion" },
  { value: "technical_support", label: "Technical Support" },
  { value: "mentorship", label: "Student Mentorship Programs" },
  { value: "internship", label: "Internship Opportunities" },
  { value: "other", label: "Other" },
] as const;

const partnerSchema = z.object({
  contactName: z.string().min(2, "Contact person name is required"),
  contactTitle: z.string().min(2, "Contact person title is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  organizationName: z.string().min(2, "Organization name is required"),
  organizationType: z.enum(organizationTypes.map(o => o.value) as ["corporate","educational","nonprofit","government","foundation","other"], { required_error: "Please select organization type" }),
  organizationTypeOther: z.string().optional(),
  website: z.string().optional(),
  organizationSize: z.enum(["small", "medium", "large", "enterprise"], { required_error: "Please select organization size" }),
  partnershipInterests: z.array(z.enum(partnershipInterests.map(o => o.value) as ["financial_sponsorship","prize_donation","venue_support","marketing_support","technical_support","mentorship","internship","other"])).min(1, "Please select at least one partnership interest"),
  partnershipInterestsOther: z.string().optional(),
  budget: z.enum(["under_100k", "100k_500k", "500k_1m", "1m_plus", "non_monetary"], { required_error: "Please select budget range" }),
  previousPartnership: z.enum(["yes", "no"], { required_error: "Please indicate if you have previous partnership experience" }),
  partnershipDetails: z.string().optional(),
  goals: z.string().min(10, "Please describe your partnership goals"),
  timeline: z.enum(["immediate", "3_months", "6_months", "1_year"], { required_error: "Please select preferred timeline" }),
  notes: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.organizationType === "other" && !data.organizationTypeOther?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["organizationTypeOther"], message: "Please specify organization type" });
  }
  if (data.partnershipInterests?.includes("other") && !data.partnershipInterestsOther?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["partnershipInterestsOther"], message: "Please specify other partnership interests" });
  }
});

export function PartnerRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof partnerSchema>>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      contactName: "",
      contactTitle: "",
      email: "",
      phone: "",
      organizationName: "",
      organizationType: undefined,
      organizationTypeOther: "",
      website: "",
      organizationSize: undefined,
      partnershipInterests: [],
      partnershipInterestsOther: "",
      budget: undefined,
      previousPartnership: undefined,
      partnershipDetails: "",
      goals: "",
      timeline: undefined,
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof partnerSchema>) {
    const WEB3FORMS_KEY = "dfeaba57-2dc1-45e1-8c31-9d75f2823e10";
    const subject = "Partnership Inquiry - IMT 2025";

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
        toast.success("Partnership inquiry submitted successfully! We will contact you shortly to discuss opportunities.");
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
            <h3 className="text-2xl font-bold">Partnership Inquiry Received</h3>
            <p className="text-muted-foreground mt-2">Thank you for your interest in partnering with us! We will review your inquiry and contact you to discuss partnership opportunities.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild>
                <Link to="/partners">View Partners</Link>
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
          <h3 className="text-lg font-semibold">Partnership Inquiry</h3>
          <p className="text-sm text-muted-foreground">Partner with us to empower students and advance academic excellence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="contactName" render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="contactTitle" render={({ field }) => (
            <FormItem>
              <FormLabel>Title/Position</FormLabel>
              <FormControl>
                <Input placeholder="Your title or position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@organization.com" {...field} />
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
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="organizationName" render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Your organization's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="organizationType" render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {organizationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="organizationSize" render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="small">Small (1-50 employees)</SelectItem>
                  <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                  <SelectItem value="large">Large (201-1000 employees)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {form.watch("organizationType") === "other" && (
          <FormField control={form.control} name="organizationTypeOther" render={({ field }) => (
            <FormItem>
              <FormLabel>Please specify organization type</FormLabel>
              <FormControl>
                <Input placeholder="Describe your organization type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}

        <FormField control={form.control} name="website" render={({ field }) => (
          <FormItem>
            <FormLabel>Website (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://yourorganization.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="partnershipInterests" render={() => (
          <FormItem>
            <FormLabel>Partnership Interests (Select all that apply)</FormLabel>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
              {partnershipInterests.map((interest) => (
                <FormField key={interest.value} control={form.control} name="partnershipInterests" render={({ field }) => {
                  const checked = (field.value || []).includes(interest.value);
                  return (
                    <FormItem className="flex items-center gap-3 space-y-0 border rounded-md p-3">
                      <FormControl>
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(v) => {
                            const arr = new Set(field.value || []);
                            if (v) arr.add(interest.value); else arr.delete(interest.value);
                            field.onChange(Array.from(arr));
                          }}
                        />
                      </FormControl>
                      <FormLabel className="!m-0 !text-sm">{interest.label}</FormLabel>
                    </FormItem>
                  );
                }} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        {form.watch("partnershipInterests")?.includes("other") && (
          <FormField control={form.control} name="partnershipInterestsOther" render={({ field }) => (
            <FormItem>
              <FormLabel>Please specify other partnership interests</FormLabel>
              <FormControl>
                <Input placeholder="Describe your other partnership interests" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="budget" render={({ field }) => (
            <FormItem>
              <FormLabel>Program Sponsorship & Collaboration Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select collaboration level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="under_100k">Supporting Partner (Under ₦100,000)</SelectItem>
                  <SelectItem value="100k_500k">Program Partner (₦100,000 - ₦500,000)</SelectItem>
                  <SelectItem value="500k_1m">Strategic Partner (₦500,000 - ₦1,000,000)</SelectItem>
                  <SelectItem value="1m_plus">Premier Partner (₦1,000,000+)</SelectItem>
                  <SelectItem value="non_monetary">In-kind/Resource Collaboration</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="timeline" render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Timeline</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (within 1 month)</SelectItem>
                  <SelectItem value="3_months">Within 3 months</SelectItem>
                  <SelectItem value="6_months">Within 6 months</SelectItem>
                  <SelectItem value="1_year">Within 1 year</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="previousPartnership" render={({ field }) => (
          <FormItem>
            <FormLabel>Have you partnered with educational initiatives before?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select yes or no" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        {form.watch("previousPartnership") === "yes" && (
          <FormField control={form.control} name="partnershipDetails" render={({ field }) => (
            <FormItem>
              <FormLabel>Please describe your previous partnership experience</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about your previous educational partnerships..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}

        <FormField control={form.control} name="goals" render={({ field }) => (
          <FormItem>
            <FormLabel>What are your goals for this partnership?</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe what you hope to achieve through this partnership..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="notes" render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes (Optional)</FormLabel>
            <FormControl>
              <Textarea placeholder="Any additional information you'd like to share..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" className="w-full">
          Submit Partnership Inquiry
        </Button>
      </form>
    </Form>
  );
}