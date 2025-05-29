import Image from "next/image";
import { AgeCard } from "./_components/AgeCard";
import { BestPerformerCard } from "./_components/BestPerformerCard";
import { BounceBackCard } from "./_components/BounceBackCard";
import { ChatWithMeCard } from "./_components/ChatWithMeCard";
import { DateAndTimeCard } from "./_components/DateAndTimeCard";
import { ExperiencesCard } from "./_components/ExperiencesCard";
import { FeaturedProjects } from "./_components/FeaturedProjects";
import { FreelanceProjects } from "./_components/FreelanceProjects";
import { GitHubCalendarAndCarousel } from "./_components/GitHubCalendarAndCarousel";
import { HireMeCard } from "./_components/HireMeCard";
import { IntroCard } from "./_components/IntroCard";
import { LocationCard } from "./_components/LocationCard";
import { SocialsGrid } from "./_components/SocialsGrid";
import { TechStackCard } from "./_components/TechStackCard";

import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="px-4 pb-28 md:px-8">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-6 gap-6 pt-14">
        <IntroCard />
        <div className="col-span-6 flex h-full flex-col gap-6 lg:col-span-2">
          <LocationCard />
          <SocialsGrid />
        </div>
        <GitHubCalendarAndCarousel />
        <TechStackCard />
        <ChatWithMeCard />
        <HireMeCard />
        <div className="col-span-6 flex flex-col gap-6 lg:col-span-2">
          <DateAndTimeCard />
          <FreelanceProjects />
          <div className="group relative min-h-[400px] flex-1 overflow-hidden rounded-2xl md:h-full">
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/0 opacity-0 transition-all duration-500 group-hover:bg-black/60 group-hover:opacity-100">
              <p className="italic text-white">
                i recently bought a m4 mac mini!!
              </p>
            </div>
            <Image
              src="/home-images/mac-mini.jpeg"
              alt="mac mini"
              fill
              className="rounded-2xl object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="col-span-6 flex h-full flex-col gap-6 lg:col-span-1">
          <BounceBackCard />
          <BestPerformerCard />
          <div className="group relative h-full min-h-[400px] flex-1 overflow-hidden rounded-2xl">
            <Image
              src="/home-images/building.jpeg"
              alt="my office"
              fill
              className="rounded-2xl object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 px-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="text-center italic text-white">
                currently interning at xebia, gurgaon
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 flex h-full flex-1 flex-col gap-5 lg:col-span-3">
          <div className="flex flex-[1] flex-col gap-5 md:flex-row">
            <ExperiencesCard />
            <AgeCard />
          </div>
          <FeaturedProjects />
        </div>
      </div>
    </main>
  );
}
