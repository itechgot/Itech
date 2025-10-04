import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FileText, Calendar, Users, AlertTriangle, Scale, Mail } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="container py-16 md:py-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Terms of Use</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Please review these terms carefully before participating in our programs or using our services. 
                By registering or using our website, you agree to these terms.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Last updated: October 2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="container py-16 md:py-20">
          <div className="max-w-3xl space-y-12">
            
            {/* Acceptance */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing our website, registering for events, or participating in our programs, 
                you acknowledge that you have read, understood, and agree to be bound by these Terms of Use 
                and our Privacy Policy.
              </p>
            </div>

            {/* Eligibility & Participation */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Eligibility & Participation</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">Event Participation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The Igiehon Mathematics Tournament is open to Senior Secondary School students in Edo State</li>
                  <li>Teams must consist of exactly two (2) students from the same school</li>
                  <li>Each team must have an identified teacher coach</li>
                  <li>All participants must be current students at the time of registration</li>
                  <li>Registration information must be accurate and complete</li>
                </ul>
                
                <h3 className="text-lg font-medium text-foreground">Volunteer Requirements</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Volunteers must be at least 16 years of age</li>
                  <li>Background checks may be required for certain volunteer positions</li>
                  <li>Volunteers must attend required orientation sessions</li>
                </ul>
              </div>
            </div>

            {/* Code of Conduct */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Code of Conduct</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>All participants, volunteers, and attendees must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Treat all individuals with respect and dignity</li>
                  <li>Follow all event rules and instructions from organizers</li>
                  <li>Maintain academic integrity and fair play</li>
                  <li>Refrain from disruptive, discriminatory, or inappropriate behavior</li>
                  <li>Respect venue property and equipment</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
                <p>
                  Violation of this code may result in disqualification, removal from the event, 
                  or prohibition from future participation.
                </p>
              </div>
            </div>

            {/* Website Use */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Website Use</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>When using our website, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and truthful information</li>
                  <li>Use the website only for lawful purposes</li>
                  <li>Not attempt to gain unauthorized access to any part of the website</li>
                  <li>Not interfere with or disrupt the website's functionality</li>
                  <li>Not use automated systems to access the website without permission</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </div>
            </div>

            {/* Event Modifications */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Event Modifications & Cancellations</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We reserve the right to modify, postpone, or cancel events due to circumstances 
                  beyond our control, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Natural disasters or severe weather conditions</li>
                  <li>Government regulations or public health emergencies</li>
                  <li>Venue unavailability or safety concerns</li>
                  <li>Insufficient registrations or other operational challenges</li>
                </ul>
                <p>
                  In such cases, we will make reasonable efforts to notify participants as soon as possible 
                  and provide alternative arrangements where feasible.
                </p>
              </div>
            </div>

            {/* Liability */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Scale className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  To the fullest extent permitted by law, the Igiehon Foundation and its organizers, 
                  volunteers, and partners shall not be liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Any indirect, incidental, special, or consequential damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Personal injury or property damage (except where caused by gross negligence)</li>
                  <li>Delays, cancellations, or modifications to events</li>
                  <li>Actions or omissions of third-party service providers</li>
                </ul>
                <p>
                  Participants and attendees assume responsibility for their own safety and well-being 
                  during events and activities.
                </p>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Intellectual Property</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  All content on this website, including text, graphics, logos, images, and software, 
                  is the property of the Igiehon Foundation or its licensors and is protected by 
                  copyright and other intellectual property laws.
                </p>
                <p>
                  By participating in our events, you grant us permission to use photographs, videos, 
                  and other media featuring you for promotional and educational purposes.
                </p>
              </div>
            </div>

            {/* Privacy */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Privacy</h2>
              <p className="text-muted-foreground">
                Your privacy is important to us. Please review our{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>{" "}
                to understand how we collect, use, and protect your personal information.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We may update these Terms of Use from time to time. Any changes will be posted on this page 
                with an updated effective date. Your continued use of our services after such changes 
                constitutes acceptance of the new terms.
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-4 p-6 bg-muted/30 rounded-lg border">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Contact Us</h2>
              </div>
              <p className="text-muted-foreground">
                If you have questions about these Terms of Use, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> info@igiehonfoundation.org</p>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
