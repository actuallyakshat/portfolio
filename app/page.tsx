import { AgeCard } from "./_components/AgeCard";
import { BestPerformerCard } from "./_components/BestPerformerCard";
import { BounceBackCard } from "./_components/BounceBackCard";
import { DateAndTimeCard } from "./_components/DateAndTimeCard";
import { FeaturedProjects } from "./_components/FeaturedProjects";
import { FreelanceProjects } from "./_components/FreelanceProjects";
import { GitHubCalendarAndCarousel } from "./_components/GitHubCalendarAndCarousel";
import { HireMeCard } from "./_components/HireMeCard";
import { IntroCard } from "./_components/IntroCard";
import { LocationCard } from "./_components/LocationCard";
import { SocialsGrid } from "./_components/SocialsGrid";
import { TechStackCard } from "./_components/TechStackCard";

export default function Home() {
  return (
    <main className="px-8 pb-32">
      <div className="mx-auto mt-28 grid w-full max-w-screen-xl grid-cols-6 gap-6">
        <IntroCard />
        <div className="col-span-6 flex h-full flex-col gap-6 lg:col-span-2">
          <LocationCard />
          <SocialsGrid />
        </div>
        <GitHubCalendarAndCarousel />
        <TechStackCard />
        <AgeCard />
        <HireMeCard />
        <div className="col-span-6 flex flex-col gap-6 lg:col-span-2">
          <DateAndTimeCard />
          <FreelanceProjects />
        </div>
        <div className="col-span-6 flex h-full flex-col gap-6 lg:col-span-1">
          <BounceBackCard />
          <BestPerformerCard />
        </div>
        <FeaturedProjects />
      </div>
    </main>
  );
}
