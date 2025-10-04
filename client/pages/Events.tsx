import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { upcomingEvent, pastEvents } from "@/data/content";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Play, Trophy, Users, BookOpen, Target, Lightbulb, Star, Award } from "lucide-react";

export default function Events() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(hsl(var(--brand-gold))/0.12_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="container py-16 md:py-24">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Events
              </h1>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Join the Igiehon Foundation for upcoming programs and the IMT
                2025 tournament.
              </p>
            </Reveal>

            <div className="mt-8 grid md:grid-cols-3 gap-6 items-stretch">
              <Reveal>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h3 className="text-xl font-semibold">
                    Upcoming: {upcomingEvent.title}
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    {upcomingEvent.date} • {upcomingEvent.venue}
                  </p>
                  <ul className="mt-4 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>
                      Registration Window: {upcomingEvent.registrationWindow}
                    </li>
                    <li>Initial Round: Written test</li>
                    <li>Finals: Oral segment</li>
                  </ul>
                  <div className="mt-6">
                    <Button
                      asChild
                      className="brand-gradient text-primary-foreground"
                    >
                      <Link to="/register">Register your school</Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h4 className="font-semibold">Schedule (Indicative)</h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>08:30 — Arrival & Check-in</li>
                    <li>09:30 — Opening Ceremony</li>
                    <li>10:00 — Written Round</li>
                    <li>12:30 — Lunch Break</li>
                    <li>14:00 — Oral Finals</li>
                    <li>16:00 — Awards & Closing</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <h4 className="font-semibold">Eligibility at a Glance</h4>
                  <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Senior Secondary Schools in Edo State</li>
                    <li>Two students per team + a teacher coach</li>
                    <li>Current SS students only</li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Winner Testimonial Video Section */}
            <section className="mt-16 md:mt-24">
              <Reveal>
                <div className="rounded-3xl border bg-gradient-to-br from-primary/5 via-card to-accent/5 p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Trophy className="h-8 w-8 text-brand-gold" />
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                          From Champion to University Success
                        </h2>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                        Meet Adaora Okafor, winner of IMT 2022, now thriving as a Mathematics major at the University of Lagos. 
                        Her journey from tournament champion to academic excellence showcases the transformative power of mathematical competition.
                      </p>
                      <blockquote className="border-l-4 border-brand-gold pl-4 italic text-foreground mb-6">
                        "The tournament didn't just test my math skills—it ignited a passion that shaped my entire academic journey. 
                        The confidence I gained competing alongside brilliant minds from across Edo State gave me the courage to pursue 
                        mathematics at the highest level."
                      </blockquote>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          <span>IMT 2022 Champion</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span>UNILAG Mathematics</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-dashed border-primary/30">
                        <div className="text-center">
                          <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground">
                            Testimonial Video
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Coming Soon
                          </p>
                        </div>
                      </div>
                      <div className="absolute -top-4 -right-4 bg-brand-gold text-primary-foreground rounded-full p-3">
                        <Star className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* IMT 2024 Highlights Section */}
            <section className="mt-16 md:mt-24">
              <Reveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Highlights from IMT 2024
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Relive the excitement, brilliance, and unforgettable moments from the 3rd Igiehon Mathematics Tournament
                  </p>
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <Reveal>
                  <div className="group relative overflow-hidden rounded-2xl border bg-card">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src="/images/IMG-20250925-WA0000 (1).jpg"
                        alt="IMT 2024 Competition in Progress"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg">Minds at Work</h3>
                      <p className="text-sm opacity-90">Students tackling complex mathematical challenges</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="group relative overflow-hidden rounded-2xl border bg-card">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src="https://igiehonfoundation.org/assets/images/winnersawsrd-902x856.webp"
                        alt="IMT 2024 Winners Celebration"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg">Victory Celebration</h3>
                      <p className="text-sm opacity-90">Champions receiving their well-deserved recognition</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="group relative overflow-hidden rounded-2xl border bg-card">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src="https://igiehonfoundation.org/assets/images/students-696x759.webp"
                        alt="IMT 2024 Participants"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg">Future Leaders</h3>
                      <p className="text-sm opacity-90">Brilliant students representing their schools with pride</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal>
                <div className="rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-8">
                  <div className="grid md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">150+</div>
                      <div className="text-sm text-muted-foreground">Participating Students</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">75</div>
                      <div className="text-sm text-muted-foreground">Schools Represented</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">₦2.25M</div>
                      <div className="text-sm text-muted-foreground">Total Prize Pool</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">100%</div>
                      <div className="text-sm text-muted-foreground">Unforgettable Experience</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-16 md:mt-24">
              Past Events Gallery
            </h2>
            <div className="mt-6">
              <Reveal>
                <div className="relative">
                  <Carousel opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                      {pastEvents.map((e) => (
                        <CarouselItem
                          key={e.title}
                          className="md:basis-1/2 lg:basis-1/3"
                        >
                          <div className="group overflow-hidden rounded-2xl border bg-card">
                            <div className="aspect-[16/10] overflow-hidden">
                              <img
                                src={e.image}
                                alt={e.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="p-4">
                              <div className="text-sm text-muted-foreground">
                                {e.date}
                              </div>
                              <div className="font-semibold">{e.title}</div>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-6" />
                    <CarouselNext className="-right-6" />
                  </Carousel>
                </div>
              </Reveal>
            </div>

            {/* Exciting Section for Students and Educators */}
            <section className="mt-16 md:mt-24">
              <Reveal>
                <div className="rounded-3xl border bg-gradient-to-br from-accent/10 via-card to-primary/10 p-8 md:p-12">
                  <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Lightbulb className="h-8 w-8 text-brand-gold animate-pulse" />
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Ready to Make Math History?
                      </h2>
                      <Lightbulb className="h-8 w-8 text-brand-gold animate-pulse" />
                    </div>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                      Where calculators meet courage, equations meet excitement, and students discover that math isn't just numbers—it's magic! ✨
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                          <Target className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Dear Future Math Legends 🎯</h3>
                          <p className="text-muted-foreground">
                            Think you're just "okay" at math? Plot twist: You might be the next mathematical superhero! 
                            Our tournament is where "I can't do math" transforms into "Watch me solve this!" 
                            Come for the competition, stay for the confidence boost that lasts a lifetime.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-accent/10 rounded-full p-3 flex-shrink-0">
                          <Users className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Calling All Math Mentors 👨‍🏫👩‍🏫</h3>
                          <p className="text-muted-foreground">
                            Teachers, this is your moment to shine brighter than a perfectly solved quadratic equation! 
                            Watch your students discover they're mathematical ninjas in disguise. 
                            Warning: Side effects may include increased classroom enthusiasm and students actually asking for extra math problems!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-brand-gold/10 to-primary/10 rounded-2xl p-6 border">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <span>🧮</span> Fun Math Facts That'll Blow Your Mind
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• The word "mathematics" comes from Greek meaning "that which is learned" - and you're about to learn you're awesome!</li>
                          <li>• Zero was invented in India - just like how you'll go from zero doubt to hero confidence!</li>
                          <li>• A group of mathematicians is called a "theorem" - okay, we made that up, but wouldn't it be cool?</li>
                          <li>• The tournament prize money could buy approximately 50,000 pencils - but we prefer giving cash! 💰</li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <span>🎭</span> What Students Really Think
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="italic">"I came for the prize money, stayed for the mathematical enlightenment!" - Anonymous Champion</div>
                          <div className="italic">"Finally, a place where being good at math makes you the cool kid!" - Future Engineer</div>
                          <div className="italic">"My calculator and I have never been closer." - Team Captain</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center gap-4 bg-gradient-to-r from-primary to-accent text-white rounded-full px-8 py-4 text-lg font-semibold">
                      <span>Ready to join the mathematical adventure?</span>
                      <span className="animate-bounce">🚀</span>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      Registration closes faster than you can say "Pythagorean theorem"!
                    </p>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* Benefits for All Participants */}
            <section className="mt-16 md:mt-24">
              <Reveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Benefits for All Participants
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                    Participating in the math tournament elevates a school's reputation, highlights student achievements, 
                    and promotes a culture of academic excellence and collaboration.
                  </p>
                </div>
              </Reveal>

              <div className="grid lg:grid-cols-2 gap-12 mb-12">
                {/* For Students */}
                <Reveal>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-primary/10 rounded-full p-3">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">For Students</h3>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-brand-gold/10 rounded-full p-2 flex-shrink-0 mt-1">
                          <Trophy className="h-5 w-5 text-brand-gold" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Personal Growth and Achievement</h4>
                          <p className="text-muted-foreground">
                            Participating in a tournament of this level is a significant achievement, and you may surprise 
                            yourself by realizing your true potential. Every challenge conquered builds unshakeable confidence.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 rounded-full p-2 flex-shrink-0 mt-1">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Skill Development</h4>
                          <p className="text-muted-foreground">
                            Preparing for the competition deepens your mathematical knowledge and helps you learn new concepts. 
                            Master advanced problem-solving techniques that extend far beyond the classroom.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-accent/10 rounded-full p-2 flex-shrink-0 mt-1">
                          <Users className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Networking Opportunities</h4>
                          <p className="text-muted-foreground">
                            You'll meet like-minded students from other schools who share your passion for math. 
                            Build friendships and connections that could last a lifetime.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 rounded-full p-2 flex-shrink-0 mt-1">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Future Advantages</h4>
                          <p className="text-muted-foreground">
                            Joining the math team strengthens your resume and showcases valuable skills like problem-solving 
                            and teamwork—highly valued by universities and employers worldwide.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* For Schools & Educators */}
                <Reveal>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-accent/10 rounded-full p-3">
                        <BookOpen className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-2xl font-bold">For Schools & Educators</h3>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-brand-gold/10 rounded-full p-2 flex-shrink-0 mt-1">
                          <Award className="h-5 w-5 text-brand-gold" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Enhanced School Reputation</h4>
                          <p className="text-muted-foreground">
                            Participation elevates your school's academic profile and demonstrates commitment to excellence. 
                            Stand out as an institution that nurtures mathematical talent.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 rounded-full p-2 flex-shrink-0 mt-1">
                          <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Professional Development</h4>
                          <p className="text-muted-foreground">
                            Teachers gain exposure to advanced mathematical concepts and innovative teaching methods. 
                            Network with fellow educators and share best practices.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-accent/10 rounded-full p-2 flex-shrink-0 mt-1">
                          <Users className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Student Motivation</h4>
                          <p className="text-muted-foreground">
                            Competition creates excitement around mathematics, inspiring students to excel beyond 
                            regular curriculum requirements and discover their hidden potential.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 rounded-full p-2 flex-shrink-0 mt-1">
                          <Star className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Recognition & Awards</h4>
                          <p className="text-muted-foreground">
                            Winning schools and teachers receive recognition, certificates, and prizes. 
                            Celebrate achievements that highlight your institution's academic excellence.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal>
                <div className="rounded-2xl border bg-gradient-to-r from-primary/5 via-card to-accent/5 p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Experience These Benefits?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Join hundreds of students and educators who have already discovered the transformative power of mathematical competition.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="brand-gradient text-primary-foreground">
                      <Link to="/register">Register Your School</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link to="/faq">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
