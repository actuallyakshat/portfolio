import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import GithubActivityCalendar from "./_components/GithubActivityCalendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <main className="px-8 pb-10">
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
        <div className="col-span-6 flex items-center gap-6">
          <SetupImagesCarousel />
          <GithubActivityCalendar />
        </div>
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
      className="relative h-full w-full flex-1 rounded-2xl bg-white shadow-xl"
    >
      <CarouselContent className="m-0 h-full w-full bg-red-400 p-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <CarouselItem key={i} className="m-0 border-red-400 p-0">
            <div className="relative h-full w-full flex-1 bg-card p-0">
              <Image
                src={"/setup/" + (i + 1) + ".jpeg"}
                alt="setup image"
                layout="fill"
                objectFit="cover"
                className={`h-full w-full object-cover ${i == 1 || i == 3 ? "object-center" : "object-[center_100%]"}`}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
