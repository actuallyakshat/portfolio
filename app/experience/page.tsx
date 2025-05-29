import { BlurFade } from "@/components/magicui/blur-fade";
import React from "react";

import { HomeIcon, NotebookIcon } from "lucide-react";
import { ResumeCard } from "./_components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BlurFadeText from "@/components/magicui/blur-fade-text";

export const DATA = {
  name: "Dillion Verma",
  initials: "DV",
  url: "https://dillion.io",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "Software Engineer turned Entrepreneur. I love building things and helping people. Very active on Twitter.",
  summary:
    "At the end of 2022, I quit my job as a software engineer to go fulltime into building and scaling my own SaaS businesses. In the past, [I pursued a double degree in computer science and business](/#education), [interned at big tech companies in Silicon Valley](https://www.youtube.com/watch?v=d-LJ2e5qKdE), and [competed in over 21 hackathons for fun](/#hackathons). I also had the pleasure of being a part of the first ever in-person cohort of buildspace called [buildspace sf1](https://buildspace.so/sf1).",
  avatarUrl: "/me.png",

  work: [
    {
      company: "Xebia IT Architects",
      href: "https://xebia.com",
      badges: ["Present"],
      location: "Gurgaon",
      title: "Full Stack Intern",
      logoUrl: "/experience/xebia.jpg",
      start: "March 2025",
      end: "Present",
      description:
        "Since February 2025, I have been gaining invaluable professional experience as a Software Developer Intern at Xebia, where I contribute to the development of XChat—an internal AI agent platform designed to serve over 6,500 employees and showcase Xebia's Generative AI capabilities to potential clients. My primary responsibility has been implementing a sophisticated adapter pattern to integrate FastAPI microservices with a Spring Boot backend, enabling robust and persistent data storage while ensuring scalability and maintainability. This role has provided me with direct exposure to enterprise-level architecture and expert GenAI teams, along with hands-on experience using modern technologies such as Next.js in real-world, production-grade systems.",
    },
    {
      company: "Freelancer",
      href: "",
      badges: [],
      location: "Gurgaon",
      title: "Full Stack Intern",
      logoUrl: "/experience/xebia.jpg",
      start: "March 2025",
      end: "Present",
      description:
        "Since February 2025, I have been gaining invaluable professional experience as a Software Developer Intern at Xebia, where I contribute to the development of XChat—an internal AI agent platform designed to serve over 6,500 employees and showcase Xebia's Generative AI capabilities to potential clients. My primary responsibility has been implementing a sophisticated adapter pattern to integrate FastAPI microservices with a Spring Boot backend, enabling robust and persistent data storage while ensuring scalability and maintainability. This role has provided me with direct exposure to enterprise-level architecture and expert GenAI teams, along with hands-on experience using modern technologies such as Next.js in real-world, production-grade systems.",
    },
  ],
  education: [
    {
      school: "Buildspace",
      href: "https://buildspace.so",
      degree: "s3, s4, sf1, s5",
      logoUrl: "/buildspace.jpg",
      start: "2023",
      end: "2024",
    },
    {
      school: "University of Waterloo",
      href: "https://uwaterloo.ca",
      degree: "Bachelor's Degree of Computer Science (BCS)",
      logoUrl: "/waterloo.png",
      start: "2016",
      end: "2021",
    },
    {
      school: "Wilfrid Laurier University",
      href: "https://wlu.ca",
      degree: "Bachelor's Degree of Business Administration (BBA)",
      logoUrl: "/laurier.png",
      start: "2016",
      end: "2021",
    },
    {
      school: "International Baccalaureate",
      href: "https://ibo.org",
      degree: "IB Diploma",
      logoUrl: "/ib.png",
      start: "2012",
      end: "2016",
    },
  ],
} as const;

const BLUR_FADE_DELAY = 0.04;

export default function Experience() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-2xl flex-col pb-32 pt-16">
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
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
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
    </main>
  );
}
