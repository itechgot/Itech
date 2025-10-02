import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { upcomingEvent } from "@/data/content";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  description: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "Registration & Eligibility",
    description: "Everything you need to know about signing up for the tournament",
    items: [
      {
        question: "Who can participate in the tournament?",
        answer: "The tournament is open to all Senior Secondary Schools in Edo State. All participants must be current Senior Secondary Students from any class (SS1, SS2, or SS3)."
      },
      {
        question: "How many students can register per school?",
        answer: "Each school can register one team consisting of exactly two (2) students. Students can be from any class or department within the school."
      },
      {
        question: "Is a teacher coach required?",
        answer: "Yes, every team must identify a teacher coach at registration. The teacher coach will serve as the primary contact and supervisor for the team throughout the tournament."
      },
      {
        question: "Is there a registration fee?",
        answer: "No, registration is completely free for all participating schools."
      },
      {
        question: "When is the registration deadline?",
        answer: `Registration is open from ${upcomingEvent.registrationWindow}. Make sure to register before the deadline to secure your team's spot.`
      },
      {
        question: "Can students from different classes team up?",
        answer: "Yes, the two students in a team can be from any class or department within the same school. For example, one student from SS1 and another from SS3 can form a team."
      }
    ]
  },
  {
    title: "Competition Format",
    description: "Understanding how the tournament works",
    items: [
      {
        question: "What is the format of the competition?",
        answer: "The tournament consists of two main stages: a Written Test (Initial Round) for all registered teams, followed by an Oral Segment (Finals) for qualifying teams."
      },
      {
        question: "What topics will be covered in the competition?",
        answer: "The competition covers mathematics topics typically taught in Senior Secondary Schools, including algebra, geometry, trigonometry, calculus, and problem-solving techniques."
      },
      {
        question: "How many teams advance to the finals?",
        answer: "The top-performing teams from the written test will advance to the oral segment (finals). The exact number depends on the total number of participating teams."
      },
      {
        question: "Can teams use calculators or reference materials?",
        answer: "Specific rules about calculators and reference materials will be communicated to registered teams closer to the tournament date. Generally, basic calculators may be allowed for certain sections."
      },
      {
        question: "How long is the competition?",
        answer: "The written test typically lasts 2-3 hours, while the oral segment varies depending on the number of finalist teams. The entire event usually runs for a full day."
      }
    ]
  },
  {
    title: "Prizes & Awards",
    description: "Recognition and rewards for outstanding performance",
    items: [
      {
        question: "What prizes are available?",
        answer: "Cash prizes are awarded as follows: 1st Place - ₦1,000,000, 2nd Place - ₦750,000, and 3rd Place - ₦500,000."
      },
      {
        question: "Are there additional awards besides cash prizes?",
        answer: "Yes! Laptops are awarded to the top 3 individual students, and consolation prizes are given to the top 10 students, their teachers, and their schools."
      },
      {
        question: "How are individual student awards determined?",
        answer: "Individual student performance is assessed separately from team performance, allowing recognition of outstanding individual contributors even if their team doesn't place in the top 3."
      },
      {
        question: "Do teachers and schools receive recognition?",
        answer: "Absolutely! Teachers of winning students and their schools receive recognition and awards, acknowledging their role in developing mathematical talent."
      }
    ]
  },
  {
    title: "Event Logistics",
    description: "Practical information about the tournament day",
    items: [
      {
        question: "When and where is the tournament?",
        answer: `The 4th Igiehon Mathematics Tournament will be held on ${upcomingEvent.date} in ${upcomingEvent.venue}.`
      },
      {
        question: "What should teams bring on the tournament day?",
        answer: "Teams should bring valid school identification, writing materials (pens, pencils, erasers), and any permitted calculators. Specific requirements will be communicated to registered teams."
      },
      {
        question: "Is accommodation provided for out-of-town schools?",
        answer: "Accommodation arrangements depend on the specific needs of participating schools. Contact us through the registration form or contact page to discuss accommodation requirements."
      },
      {
        question: "Will meals be provided during the tournament?",
        answer: "Light refreshments are typically provided during breaks. Detailed information about meals and refreshments will be shared with registered teams before the event."
      },
      {
        question: "What COVID-19 safety measures are in place?",
        answer: "We follow current health guidelines to ensure a safe environment for all participants. Specific safety protocols will be communicated closer to the event date."
      }
    ]
  },
  {
    title: "After Registration",
    description: "What happens once you've registered",
    items: [
      {
        question: "What happens after I submit the registration form?",
        answer: "You'll receive an immediate confirmation on the page. Our team will review your registration and may contact you via email or phone for verification or additional information."
      },
      {
        question: "How will I receive updates about the tournament?",
        answer: "Updates will be sent to the email address and phone number provided during registration. Make sure to provide accurate contact information for your teacher coach."
      },
      {
        question: "Can I modify my registration after submission?",
        answer: "Yes, you can contact us through the contact page or email to request changes to your registration. However, changes may not be possible close to the tournament date."
      },
      {
        question: "What if my school needs to withdraw from the tournament?",
        answer: "If you need to withdraw, please contact us as soon as possible so we can update our records and potentially offer the spot to another school."
      }
    ]
  },
  {
    title: "Volunteering & Partnerships",
    description: "Getting involved beyond participation",
    items: [
      {
        question: "How can I volunteer for the tournament?",
        answer: "Use the volunteer option on the registration page or contact us directly. We welcome volunteers to help with event coordination, student supervision, and logistics."
      },
      {
        question: "What volunteer opportunities are available?",
        answer: "Volunteers can assist with registration, exam supervision, logistics coordination, student guidance, and event setup. Training and orientation are provided for all volunteers."
      },
      {
        question: "Can organizations partner with the tournament?",
        answer: "Yes! We welcome partnerships with organizations that share our commitment to mathematics education. Use the partnership option on the registration page to express interest."
      },
      {
        question: "What are the benefits of partnering with the tournament?",
        answer: "Partners receive brand visibility, recognition at the event, and the opportunity to directly contribute to mathematics education in Edo State while fulfilling corporate social responsibility goals."
      }
    ]
  }
];

function FAQAccordion({ category }: { category: FAQCategory }) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="rounded-2xl border bg-card/50 backdrop-blur">
      <div className="p-6 border-b border-border/50">
        <h2 className="text-xl font-bold">{category.title}</h2>
        <p className="text-muted-foreground text-sm mt-1">{category.description}</p>
      </div>
      <div className="divide-y divide-border/50">
        {category.items.map((item, index) => (
          <div key={index} className="p-6">
            <button
              onClick={() => toggleItem(index)}
              className="flex items-center justify-between w-full text-left group"
            >
              <h3 className="font-medium pr-4 group-hover:text-primary transition-colors">
                {item.question}
              </h3>
              <ChevronDownIcon 
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openItems.includes(index) && (
              <div className="mt-4 text-muted-foreground leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(hsl(var(--brand-gold))/0.1_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="container py-16 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Everything you need to know about the Igiehon Mathematics Tournament. 
                Find answers to common questions about registration, competition format, prizes, and more.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="container py-16 md:py-24">
          <div className="max-w-4xl mx-auto space-y-8">
            {faqData.map((category, index) => (
              <FAQAccordion key={index} category={category} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? We're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </Link>
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 font-medium hover:bg-accent transition-colors"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
