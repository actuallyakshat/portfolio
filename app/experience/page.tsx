import { BlurFade } from "@/components/magicui/blur-fade";

import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResumeCard } from "./_components/resume-card";

export const DATA = {
  name: "Dillion Verma",
  initials: "DV",
  url: "https://dillion.io",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "A snapshot of my professional journey, highlighting key roles, projects, and milestones.",
  avatarUrl: "/me.png",

  work: [
    {
      company: "Xebia IT Architects",
      href: "https://xebia.com",
      badges: ["Present"],
      location: "Gurgaon",
      title: "Full Stack Intern",
      logoUrl: "/experience/xebia.jpeg",
      start: "March 2025",
      end: "Present",
      description:
        "Since March 2025, I have been gaining invaluable professional experience as a Software Developer Intern at Xebia, where I contribute to the development of XChat—an internal AI agent platform designed to serve over 6,500 employees and showcase Xebia's Generative AI capabilities to potential clients. My primary responsibility has been implementing a sophisticated factory-adapter pattern to integrate FastAPI microservices with a Spring Boot backend, enabling robust and persistent data storage while ensuring scalability and maintainability. This role has provided me with direct exposure to enterprise-level architecture and expert GenAI teams, along with hands-on experience using modern technologies such as Next.js in real-world, production-grade systems.",
    },
    {
      company: "Freelancer",
      href: "",
      badges: [],
      location: "Remote",
      title: "Full Stack Developer",
      logoUrl: "/experience/freelance.jpg",
      start: "June 2023 ",
      end: "January 2025",
      description:
        "As a student freelancer, I successfully delivered three diverse projects for: Primus AgroCom, an agro consultancy and commodity trading business; Glinterra, a premium diamond jewellery brand; and AR Design Studio, an interior design studio based in Kolkata. Each project was developed using Next.js and allowed me to demonstrate strong UI/UX design skills, effective project management, and the ability to consistently meet client deadlines.",
    },
  ],
} as const;

const BLUR_FADE_DELAY = 0.04;

export default function Experience() {
  return (
    <main className="graph">
      <div className="graph mx-auto flex min-h-[100dvh] max-w-2xl flex-col pb-32 pt-16">
        <section id="hero">
          <div className="mx-auto w-full max-w-2xl space-y-8">
            <div className="flex justify-between gap-2">
              <div className="flex flex-1 flex-col space-y-1.5">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  yOffset={8}
                  text={`My Experiences`}
                />
                <BlurFadeText
                  className="max-w-[600px] md:text-xl"
                  delay={BLUR_FADE_DELAY}
                  text={DATA.description}
                />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="mt-5 flex min-h-0 flex-col gap-y-3">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
