import Carousels from "./_components/Carousels";
import FirstRow from "./_components/FirstRow";
import GithubActivityCalendar from "./_components/GithubActivityCalendar";
import SkillsMarquee from "./_components/SkillsMarquee";
import TechStack from "./_components/TechStack";
export default function Home() {
  return (
    <main className="pb-16 pt-20 lg:pt-0">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 md:px-10">
        <FirstRow />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <GithubActivityCalendar />
          <SkillsMarquee />
        </div>
      </div>
    </main>
  );
}
