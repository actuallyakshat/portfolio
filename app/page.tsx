import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import GithubActivityCalendar from "./_components/GithubActivityCalendar";
import TechStack from "./_components/TechStack";
import { Cake } from "lucide-react";
import { HomeDock } from "./_components/HomeDock";

export default function Home() {
  return (
    <main className="px-8 pb-32">
      <HomeDock />
      <div className="mx-auto mt-28 grid w-full max-w-screen-xl gap-6 lg:grid-cols-6">
        <IntroCard />
        <div className="col-span-2 flex h-full flex-col gap-6">
          <div className="relative flex-1 overflow-hidden rounded-2xl border bg-white shadow-xl">
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
      </div>
    </main>
  );
}

function IntroCard() {
  return (
    <div className="relative col-span-4 flex gap-8 rounded-2xl border bg-white p-8 shadow-xl">
      <div className="relative h-full min-h-[300px] w-full flex-[2]">
        <Image
          src="/me.jpeg"
          alt="Akshat Dubey"
          priority
          layout="fill"
          objectFit="cover"
          className="aspect-square rounded-xl object-cover object-[center_60%]"
        />
      </div>

      <div className="order-2 col-span-1 lg:order-1 lg:col-span-3">
        <h2 className="text-lg font-medium text-muted-foreground">
          Hey There! My name is
        </h2>
        <h1 className="bg-gradient-to-b from-rose-400 to-orange-600 bg-clip-text pb-1 text-4xl font-black text-transparent lg:text-5xl">
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
      className="col-span-1 overflow-hidden rounded-2xl border shadow-xl"
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
      <CarouselContent className="m-0 h-full w-full p-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <CarouselItem key={i} className="relative m-0 h-72 p-0">
            <Image
              src={"/setup/" + (i + 1) + ".jpeg"}
              alt="setup image"
              objectFit="cover"
              layout="fill"
              className="aspect-square rounded-2xl object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
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
    <div className="relative col-span-3 overflow-hidden rounded-2xl border bg-white p-4 shadow-xl">
      <div className="absolute inset-0 z-[51] flex h-full w-full flex-col items-start justify-end bg-gradient-to-r from-black/80 via-black/10 to-black/80 p-8">
        <h2 className="text-lg font-bold text-white">Tech Stack</h2>
        <p className="text-sm text-zinc-300">Tools that I just love to use</p>
      </div>
      <TechStack />
    </div>
  );
}

function AgeCard() {
  return (
    <div className="relative col-span-1 flex flex-col items-start justify-end rounded-2xl border bg-white p-5 shadow-xl">
      <h2 className="text-5xl font-light">20</h2>
      <p className="text-lg font-medium">years old</p>
      <span className="absolute right-5 top-4">
        <Cake className="size-10 stroke-muted-foreground stroke-[1]" />
      </span>
    </div>
  );
}

function HireMeCard() {
  return (
    <div className="col-span-2 rounded-2xl border bg-white shadow-xl">
      Hire Me
    </div>
  );
}
