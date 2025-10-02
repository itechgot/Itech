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
      },
      {
        question: "What documents are required for registration?",
        answer: "You'll need valid school identification for both students, contact information for the teacher coach, and basic school details. No physical documents need to be uploaded during online registration."
      },
      {
        question: "Can private schools participate?",
        answer: "Yes, both public and private Senior Secondary Schools in Edo State are eligible to participate in the tournament."
      }
    ]
  },
  {
    title: "Competition Format & Rules",
    description: "Understanding how the tournament works and competition guidelines",
    items: [
      {
        question: "What is the format of the competition?",
        answer: "The tournament consists of two main stages: a Written Test (Initial Round) for all registered teams, followed by an Oral Segment (Finals) for qualifying teams."
      },
      {
        question: "What topics will be covered in the competition?",
        answer: "The competition covers mathematics topics typically taught in Senior Secondary Schools, including algebra, geometry, trigonometry, calculus, statistics, and advanced problem-solving techniques."
      },
      {
        question: "How many teams advance to the finals?",
        answer: "The top-performing teams from the written test will advance to the oral segment (finals). The exact number depends on the total number of participating teams, typically the top 10-15 teams."
      },
      {
        question: "Can teams use calculators or reference materials?",
        answer: "Specific rules about calculators and reference materials will be communicated to registered teams closer to the tournament date. Generally, basic scientific calculators may be allowed for certain sections."
      },
      {
        question: "How long is the competition?",
        answer: "The written test typically lasts 2-3 hours, while the oral segment varies depending on the number of finalist teams. The entire event usually runs for a full day from 8:00 AM to 6:00 PM."
      },
      {
        question: "What is the difficulty level of the questions?",
        answer: "Questions range from standard Senior Secondary level to challenging problem-solving scenarios. The competition is designed to test both fundamental knowledge and creative mathematical thinking."
      },
      {
        question: "Are there practice materials available?",
        answer: "Sample questions and preparation guidelines will be shared with registered teams approximately 2-3 weeks before the tournament date."
      },
      {
        question: "How is the scoring system structured?",
        answer: "The written test contributes to team qualification for finals, while the oral segment determines final rankings. Both individual and team performances are evaluated separately."
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
      },
      {
        question: "When are prizes distributed?",
        answer: "Prizes are typically distributed immediately after the closing ceremony on the tournament day. Cash prizes may require additional verification and could be distributed within 1-2 weeks."
      },
      {
        question: "Are there participation certificates?",
        answer: "Yes, all participating students, teachers, and schools receive certificates of participation, recognizing their commitment to mathematical excellence."
      }
    ]
  },
  {
    title: "Event Logistics & Preparation",
    description: "Practical information about the tournament day and preparation",
    items: [
      {
        question: "When and where is the tournament?",
        answer: `The 4th Igiehon Mathematics Tournament will be held on ${upcomingEvent.date} in ${upcomingEvent.venue}.`
      },
      {
        question: "What should teams bring on the tournament day?",
        answer: "Teams should bring valid school identification, writing materials (pens, pencils, erasers), permitted calculators, and a water bottle. Specific requirements will be communicated to registered teams."
      },
      {
        question: "What time should teams arrive?",
        answer: "Teams should arrive by 7:30 AM for registration and briefing. The competition officially begins at 8:30 AM sharp."
      },
      {
        question: "Is accommodation provided for out-of-town schools?",
        answer: "Accommodation arrangements depend on the specific needs of participating schools. Contact us through the registration form or contact page to discuss accommodation requirements."
      },
      {
        question: "Will meals be provided during the tournament?",
        answer: "Light refreshments are provided during breaks, and lunch is provided for all participants. Special dietary requirements should be communicated during registration."
      },
      {
        question: "What COVID-19 safety measures are in place?",
        answer: "We follow current health guidelines to ensure a safe environment for all participants. Specific safety protocols will be communicated closer to the event date."
      },
      {
        question: "Is there parking available at the venue?",
        answer: "Yes, parking is available at the venue. However, we recommend carpooling or using public transportation when possible due to limited spaces."
      },
      {
        question: "Can parents and other students attend as spectators?",
        answer: "Yes, parents and school supporters are welcome to attend. However, they must register as spectators and will be seated in designated areas during the competition."
      }
    ]
  },
  {
    title: "After Registration & Communication",
    description: "What happens once you've registered and how we stay in touch",
    items: [
      {
        question: "What happens after I submit the registration form?",
        answer: "You'll receive an immediate confirmation on the page. Our team will review your registration and send a detailed confirmation email within 24-48 hours with additional information."
      },
      {
        question: "How will I receive updates about the tournament?",
        answer: "Updates will be sent to the email address and phone number provided during registration. We also post important updates on our website and social media channels."
      },
      {
        question: "Can I modify my registration after submission?",
        answer: "Yes, you can contact us through the contact page or email to request changes to your registration. However, changes may not be possible close to the tournament date."
      },
      {
        question: "What if my school needs to withdraw from the tournament?",
        answer: "If you need to withdraw, please contact us as soon as possible so we can update our records and potentially offer the spot to another school."
      },
      {
        question: "How do I know if my registration was successful?",
        answer: "You'll receive an immediate on-screen confirmation followed by a detailed email confirmation within 48 hours. If you don't receive the email, please check your spam folder or contact us."
      },
      {
        question: "Will there be a pre-tournament briefing?",
        answer: "Yes, registered teams will receive detailed guidelines and rules 1-2 weeks before the tournament. A brief orientation session will also be held on the tournament morning."
      }
    ]
  },
  {
    title: "Volunteering & Partnerships",
    description: "Getting involved beyond participation and supporting the tournament",
    items: [
      {
        question: "How can I volunteer for the tournament?",
        answer: "Use the volunteer option on the registration page or contact us directly. We welcome volunteers to help with event coordination, student supervision, and logistics."
      },
      {
        question: "What volunteer opportunities are available?",
        answer: "Volunteers can assist with registration, exam supervision, logistics coordination, student guidance, event setup, and technical support. Training and orientation are provided for all volunteers."
      },
      {
        question: "Do volunteers receive any benefits?",
        answer: "Volunteers receive certificates of appreciation, meals during the event, and the satisfaction of contributing to mathematics education in Edo State."
      },
      {
        question: "Can organizations partner with the tournament?",
        answer: "Yes! We welcome partnerships with organizations that share our commitment to mathematics education. Use the partnership option on the registration page to express interest."
      },
      {
        question: "What are the benefits of partnering with the tournament?",
        answer: "Partners receive brand visibility, recognition at the event, networking opportunities, and the chance to directly contribute to mathematics education in Edo State while fulfilling corporate social responsibility goals."
      },
      {
        question: "Can alumni or former participants get involved?",
        answer: "Absolutely! Alumni and former participants can volunteer as mentors, judges, or event coordinators. Their experience is invaluable in inspiring current participants."
      },
      {
        question: "How can schools support the tournament beyond participation?",
        answer: "Schools can help by promoting the tournament to other institutions, providing volunteers, sharing resources, or offering venues for future events."
      }
    ]
  },
  {
    title: "Technical & Accessibility",
    description: "Technical requirements and accessibility considerations",
    items: [
      {
        question: "Is the venue accessible for students with disabilities?",
        answer: "Yes, we ensure the venue is accessible and can accommodate students with special needs. Please indicate any specific requirements during registration."
      },
      {
        question: "What if a student has learning difficulties or special needs?",
        answer: "We provide reasonable accommodations for students with documented learning difficulties or special needs. Contact us during registration to discuss specific requirements."
      },
      {
        question: "Are there provisions for students who need extra time?",
        answer: "Students with documented needs for extended time will be accommodated. Please provide relevant documentation during registration or contact us directly."
      },
      {
        question: "What technology is used during the competition?",
        answer: "The competition primarily uses traditional paper-and-pencil format. Any technology requirements will be clearly communicated to registered teams in advance."
      },
      {
        question: "Is there technical support available during the event?",
        answer: "Yes, technical support staff will be available throughout the event to assist with any equipment or technology-related issues."
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
    <div className="rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 sm:p-6 border-b border-border/50">
        <h2 className="text-lg sm:text-xl font-bold text-foreground">{category.title}</h2>
        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{category.description}</p>
      </div>
      <div className="divide-y divide-border/50">
        {category.items.map((item, index) => (
          <div key={index} className="p-4 sm:p-6">
            <button
              onClick={() => toggleItem(index)}
              className="flex items-start justify-between w-full text-left group focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg p-2 -m-2"
              aria-expanded={openItems.includes(index)}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="font-medium pr-4 group-hover:text-primary transition-colors text-sm sm:text-base leading-relaxed">
                {item.question}
              </h3>
              <ChevronDownIcon 
                className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-transform flex-shrink-0 mt-0.5 ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openItems.includes(index) && (
              <div 
                id={`faq-answer-${index}`}
                className="mt-3 sm:mt-4 text-muted-foreground leading-relaxed text-sm sm:text-base pl-2 border-l-2 border-primary/20"
              >
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
          <div className="container py-12 sm:py-16 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-muted-foreground mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed px-4">
                Everything you need to know about the Igiehon Mathematics Tournament. 
                Find comprehensive answers to questions about registration, competition format, prizes, logistics, and more.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 sm:px-6 py-2.5 sm:py-3 font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
                >
                  Register Your Team
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 sm:px-6 py-2.5 sm:py-3 font-medium hover:bg-accent transition-colors text-sm sm:text-base"
                >
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="container py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">Quick Navigation</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {faqData.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const element = document.getElementById(`category-${index}`);
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="p-2 sm:p-3 text-xs sm:text-sm font-medium rounded-lg border border-border bg-card/50 hover:bg-accent transition-colors text-center"
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="container py-8 sm:py-16 md:py-24">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {faqData.map((category, index) => (
              <div key={index} id={`category-${index}`} className="scroll-mt-24">
                <FAQAccordion category={category} />
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="max-w-4xl mx-auto mt-12 sm:mt-16">
            <div className="rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-6 sm:p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                Can't find the answer you're looking for? Our team is ready to help with any additional questions about the tournament.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 sm:px-6 py-2.5 sm:py-3 font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
                >
                  Contact Us
                </Link>
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 sm:px-6 py-2.5 sm:py-3 font-medium hover:bg-accent transition-colors text-sm sm:text-base"
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
