import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GithubActivityCalendar from "./_components/GithubActivityCalendar";
import { HomeDock } from "./_components/HomeDock";
import TechStack from "./_components/TechStack";
import { div, image } from "framer-motion/client";

export default function Home() {
  return (
    <main className="px-8 pb-32">
      <HomeDock />
      <div className="mx-auto mt-28 grid w-full max-w-screen-xl gap-6 lg:grid-cols-6">
        <IntroCard />
        <div className="col-span-2 flex h-full flex-col gap-6">
          <div className="relative flex-1 overflow-hidden rounded-2xl bg-white shadow-xl">
            <Image
              src={"/location.jpeg"}
              alt="location"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <SocialsGrid />
        </div>
        <GitHubCalendarAndCarousel />
        <TechStackCard />
        <AgeCard />
        <HireMeCard />
        <div className="col-span-2 flex flex-col gap-6">
          <DateAndTimeCard />
          <FreelanceProjects />
        </div>
        <div className="col-span-1 flex h-full flex-col gap-6">
          <BounceBackCard />
          <BestPerformerCard />
        </div>
        <FeaturedProjects />
      </div>
    </main>
  );
}

function IntroCard() {
  return (
    <div className="relative col-span-4 flex gap-8 rounded-2xl bg-white p-8 shadow-xl">
      <div className="relative h-full min-h-[300px] w-full flex-[2]">
        <Image
          src="/me.jpeg"
          alt="Akshat Dubey"
          priority
          layout="fill"
          objectFit="cover"
          className="aspect-square rounded-xl object-cover object-[center_80%]"
        />
      </div>

      <div className="order-2 col-span-1 lg:order-1 lg:col-span-3">
        <h2 className="text-lg font-medium text-muted-foreground">
          Hey There! My name is
        </h2>
        <h1 className="bg-gradient-to-b from-rose-400 to-red-600 bg-clip-text pb-1 text-4xl font-black text-transparent lg:text-5xl">
          Akshat Dubey
        </h1>
        <p className="mt-2 max-w-lg text-muted-foreground">
          I am a software engineer with a passion for building scalable and
          performant applications. I have a proficient understanding of
          development, particularly React and Next.js, and I am always looking
          for new challenges to push my skills to the next level.
        </p>
      </div>
    </div>
  );
}

const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/actuallyakshat",
    icon: "/socials/github.png",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/actuallyakshat/",
    icon: "/socials/linkedin.jpg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/actuallyakshat/",
    icon: "/socials/instagram.png",
  },
  {
    name: "X",
    href: "https://x.com/codexakshat",
    icon: "/socials/x.jpg",
  },
];

function SocialsGrid() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {SOCIALS.map((social) => (
        <SocialCard key={social.name} link={social.href} icon={social.icon} />
      ))}
    </div>
  );
}

function SocialCard({ link, icon }: { link: string; icon: string }) {
  return (
    <Link
      href={link}
      target="_blank"
      className="col-span-1 overflow-hidden rounded-2xl shadow-xl"
    >
      <Image
        className="size-full object-cover"
        src={icon}
        alt={icon}
        priority
        width={1080}
        height={1080}
      />
    </Link>
  );
}

function SetupImagesCarousel() {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className="relative h-full w-1/4 overflow-hidden rounded-2xl bg-white shadow-xl"
    >
      <CarouselContent className="relative m-0 h-full w-full p-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <CarouselItem key={i} className="relative m-0 h-72 p-0">
            <Image
              src={"/setup/" + (i + 1) + ".jpeg"}
              alt="setup image"
              objectFit="cover"
              layout="fill"
              className="aspect-square object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-white" />
      <CarouselNext className="text-white" />
    </Carousel>
  );
}

function GitHubCalendarAndCarousel() {
  return (
    <div className="col-span-6 flex min-h-72 flex-col items-center justify-center space-y-6 md:flex-row md:space-x-6 md:space-y-0">
      {/* Carousel Section */}

      <SetupImagesCarousel />

      {/* GitHub Calendar Section */}

      <GithubActivityCalendar />
    </div>
  );
}

function TechStackCard() {
  return (
    <div className="relative col-span-3 overflow-hidden rounded-2xl bg-white p-4 shadow-xl">
      <div className="techstack absolute inset-0 z-[51] flex h-full w-full flex-col items-start justify-end p-8">
        <h2 className="text-lg font-bold text-white">Tech Stack</h2>
        <p className="text-sm text-zinc-100">Tools that I just love to use</p>
      </div>
      <TechStack />
    </div>
  );
}

function AgeCard() {
  return (
    <Link
      href={"https://wishly.vercel.app"}
      target="_blank"
      className="group relative col-span-1 flex flex-col items-start justify-end rounded-2xl bg-white p-5 shadow-xl"
    >
      <h2 className="text-6xl font-black">20</h2>
      <p className="text-lg font-light uppercase">years old</p>
      <p className="text-xs italic text-muted-foreground">I was born in 2004</p>

      <span className="absolute right-5 top-4">
        <ArrowRight className="size-12 stroke-[1px] transition-transform duration-500 group-hover:-rotate-45" />
      </span>
    </Link>
  );
}

function HireMeCard() {
  return (
    <Link
      href={"contact"}
      className="hireme group relative col-span-2 flex items-center justify-center rounded-2xl bg-white shadow-xl"
    >
      <h2 className="text-6xl font-extrabold text-white">Hire Me</h2>
      <ArrowRight className="absolute bottom-4 right-6 text-white transition-transform duration-500 group-hover:-rotate-45" />
    </Link>
  );
}

function DateAndTimeCard() {
  return (
    <div className="col-span-2 flex h-fit gap-6 rounded-2xl bg-white bg-gradient-to-tr from-pink-600/20 via-teal-900/50 to-teal-700 p-4 shadow-xl backdrop-blur-3xl">
      <div className="flex w-fit flex-[2] flex-col gap-10 rounded-2xl bg-gradient-to-tr from-rose-400/30 via-teal-900 to-teal-700 p-4 text-white">
        <h3 className="text-3xl font-semibold">Sept 5</h3>
        <span>
          <h6 className="text-sm font-extralight text-muted">Thursday</h6>
          <h3 className="font-medium">2 Events</h3>
        </span>
      </div>
      <div className="flex-[3] pt-2 text-white">
        <h2 className="text-sm font-semibold uppercase text-muted">Upcoming</h2>
        <div className="mt-3 flex items-start gap-3">
          <div className="h-10 w-1 rounded-md bg-orange-600"></div>
          <div>
            <h3 className="text-sm font-semibold">Learn Spring Security</h3>
            <p className="text-sm font-light text-muted">12:30 PM - 4:30 PM</p>
          </div>
        </div>
        <div className="mt-3 flex items-start gap-3">
          <div className="h-10 w-1 rounded-md bg-teal-600"></div>
          <div>
            <h3 className="text-sm font-semibold">Solve Leetcode</h3>
            <p className="text-sm font-light text-muted">9:00 PM - 11:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    title: "Nota Rapida",
    description:
      "Nota Rapida is a simple note taking app that wishes to provide a minimalistic note-taking experience.",
    url: "https://nota-rapida.vercel.app",
    gradient: "bg-gradient-to-r from-sky-700 via-orange-700 to-violet-900",
  },
  {
    title: "Surf Track",
    description:
      "Surf Track is a productivity extension designed to help you monitor and manage your online activity.",
    url: "https://chromewebstore.google.com/detail/surf-track/injkidbnadfahmbcimpejmncnmogeoid",
    gradient: "bg-gradient-to-tr from-gray-500 via-gray-900 to-gray-600",
  },
  {
    title: "Zipit",
    description:
      "Zipit allows you to seamlessly share files from any device with anyone, anywhere.",
    url: "https://justzipit.vercel.app",
    gradient: "bg-gradient-to-tr from-sky-400 to-violet-900",
  },
  {
    title: "Wishly",
    description:
      "Wishly helps you set reminder for those special days you can't afford to forget.",
    url: "https://wishly.vercel.app",
    gradient: "bg-gradient-to-b from-lime-600 via-green-800 to-teal-900",
  },
];

function FeaturedProjects() {
  return (
    <div className="relative col-span-3 overflow-hidden rounded-2xl bg-[#2a2a2a] p-6 shadow-xl">
      <div className="projects-gradient absolute inset-0 right-0 top-0 z-[1]"></div>
      <div className="flex w-full items-center justify-between">
        <h2 className="relative z-[2] text-4xl font-bold text-white">
          Featured Projects
        </h2>
        <Link
          href={"/projects"}
          className="text-sm font-medium text-white hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {PROJECTS.map((project: any) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            url={project.url}
            gradient={project.gradient}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  url,
  gradient,
}: {
  title: string;
  description: string;
  url: string;
  gradient: string;
}) {
  return (
    <Link
      href={url}
      target="_blank"
      className="group relative z-[1] col-span-1 overflow-hidden rounded-xl"
    >
      <div
        className={`relative flex h-[100px] items-center justify-center overflow-hidden ${gradient}`}
      >
        <h2 className="z-[1] text-3xl font-black text-white">{title}</h2>
      </div>
      <div className="bg-white p-4">
        <p className="text-sm">{description}</p>
      </div>
    </Link>
  );
}

const FREELANCE_PROJECTS = [
  {
    title: "Sai Logistics",
    url: "https://sai-logistics.vercel.app",
    image: "/freelance-projects/sailogistics.png",
  },
  {
    title: "AR Design Studio",
    url: "https://ar-design-studio.vercel.app",
    image: "/freelance-projects/ar.png",
  },
];

function FreelanceProjects() {
  return (
    <div className="col-span-2 flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-b from-slate-100 via-slate-500 to-slate-100 p-4 shadow-xl">
      <h2 className="text-xl font-semibold uppercase">Freelance Projects</h2>
      <div className="flex flex-1 flex-col gap-3">
        {FREELANCE_PROJECTS.map((project: any) => (
          <FreelanceProjectCard
            key={project.title}
            title={project.title}
            url={project.url}
            image={project.image}
          />
        ))}
      </div>
    </div>
  );
}

function FreelanceProjectCard({
  title,
  url,
  image,
}: {
  title: string;
  url: string;
  image: string;
}) {
  return (
    <Link
      href={url}
      target="_blank"
      className="group relative w-full flex-1 overflow-hidden rounded-xl"
    >
      <Image
        src={image}
        alt="Sai Logistics"
        layout="fill"
        objectFit="cover"
        className="aspect-square object-cover object-top blur-[1.5px]"
      />
      <div className="absolute inset-0 flex items-end justify-start bg-black/30 p-4 text-2xl font-semibold text-white transition-colors group-hover:bg-black/70">
        <span className="flex items-center gap-3">
          {title}{" "}
          <ArrowRight className="size-5 transition-transform duration-500 group-hover:-rotate-45" />
        </span>
      </div>
    </Link>
  );
}

function BounceBackCard() {
  return (
    <Link
      target="_blank"
      href={
        "https://www.linkedin.com/posts/actuallyakshat_selfhelp-productivity-lifestyle-activity-7047222492318314497-pFN1?utm_source=share&utm_medium=member_desktop"
      }
      className="relative h-fit overflow-hidden rounded-2xl bg-white shadow-xl"
    >
      <Image
        src={"/bounceback.png"}
        alt="Bounce Back"
        width={1080}
        height={1080}
        className="h-full"
      />
    </Link>
  );
}

function BestPerformerCard() {
  return (
    <Link
      target="_blank"
      href={
        "https://www.linkedin.com/posts/actuallyakshat_gratitude-academicachievement-activity-7159840099206107136-rbo3?utm_source=share&utm_medium=member_desktop"
      }
      className="relative flex-1 overflow-hidden rounded-2xl bg-white p-4 shadow-xl"
    >
      <Image
        src={"/bestperformer.jpeg"}
        alt="Best Performer in SCSET Award"
        layout="fill"
        objectFit="cover"
        className="aspect-square object-cover"
      />
    </Link>
  );
}
