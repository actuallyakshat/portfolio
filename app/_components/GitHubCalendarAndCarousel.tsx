import GithubActivityCalendar from "./GithubActivityCalendar";
import { SetupImagesCarousel } from "./SetupImagesCarousel";

export function GitHubCalendarAndCarousel() {
  return (
    <div className="col-span-6 flex h-full flex-col items-center justify-center space-y-6 lg:min-h-72 lg:flex-row lg:space-x-6 lg:space-y-0">
      {/* Carousel Section */}

      <SetupImagesCarousel />

      {/* GitHub Calendar Section */}

      <GithubActivityCalendar />
    </div>
  );
}
