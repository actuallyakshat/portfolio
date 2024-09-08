import GithubActivityCalendar from "./GithubActivityCalendar";
import { SetupImagesCarousel } from "./SetupImagesCarousel";

export function GitHubCalendarAndCarousel() {
  return (
    <div className="col-span-6 flex h-full flex-col items-center justify-center space-y-6 md:min-h-72 md:flex-row md:space-x-6 md:space-y-0">
      {/* Carousel Section */}

      <SetupImagesCarousel />

      {/* GitHub Calendar Section */}

      <GithubActivityCalendar />
    </div>
  );
}
