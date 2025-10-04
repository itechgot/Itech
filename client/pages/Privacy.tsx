import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Mail, Calendar, Shield, Eye, Lock, Users } from "lucide-react";

export default function Privacy() {
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
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                We respect your privacy and are committed to protecting your personal information. 
                This policy explains how we collect, use, and safeguard your data.
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
            
            {/* Information We Collect */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We collect information you provide directly to us when you register for events, 
                  apply to volunteer, inquire about partnerships, or contact us. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, age</li>
                  <li><strong>Educational Information:</strong> School name, address, teacher details</li>
                  <li><strong>Student Information:</strong> Names and contact details of participating students</li>
                  <li><strong>Professional Information:</strong> Organization details for partnerships</li>
                  <li><strong>Communication Data:</strong> Messages, feedback, and correspondence</li>
                </ul>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process event registrations and manage participation</li>
                  <li>Communicate important updates, confirmations, and event details</li>
                  <li>Coordinate volunteer activities and partnership opportunities</li>
                  <li>Improve our programs and enhance user experience</li>
                  <li>Comply with legal obligations and protect our rights</li>
                  <li>Send periodic newsletters and program updates (with your consent)</li>
                </ul>
              </div>
            </div>

            {/* Data Protection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Data Protection & Security</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate technical and organizational measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Secure data transmission using industry-standard encryption</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                  <li>Regular security assessments and updates</li>
                  <li>Secure storage with reputable third-party service providers</li>
                </ul>
              </div>
            </div>

            {/* Data Sharing */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Information Sharing</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. 
                  We may share information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect the rights, property, or safety of our organization or others</li>
                  <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
                </ul>
              </div>
            </div>

            {/* Data Retention */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information only as long as necessary to fulfill the purposes 
                outlined in this policy, comply with legal obligations, resolve disputes, and enforce 
                our agreements. Typically, this means:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Event registration data: 3 years after the event</li>
                <li>Volunteer applications: 2 years after application</li>
                <li>Partnership inquiries: 1 year after inquiry</li>
                <li>General correspondence: 1 year after last contact</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Your Rights & Choices</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Request corrections to inaccurate or incomplete data</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at{" "}
                  <a href="mailto:info@igiehonfoundation.org" className="text-primary hover:underline">
                    info@igiehonfoundation.org
                  </a>
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4 p-6 bg-muted/30 rounded-lg border">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Contact Us</h2>
              </div>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or our data practices, 
                please contact us:
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
