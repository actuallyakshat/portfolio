import FirstRow from "./_components/FirstRow";
import GithubActivityCalendar from "./_components/GithubActivityCalendar";
export default function Home() {
  return (
    <main className="pb-16 pt-20 lg:pt-28">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-4 md:px-10">
        <FirstRow />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <GithubActivityCalendar />
          <div className="col-span-1 flex h-96 flex-col gap-4 rounded-3xl bg-card shadow-xl"></div>
        </div>
      </div>
    </main>
  );
}
