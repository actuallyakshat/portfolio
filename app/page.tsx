import Image from "next/image";
import TechStack from "./_components/TechStack";
import IntroCard from "./_components/IntroCard";

export default function Home() {
  return (
    <main className="pb-16 pt-20 lg:pt-28">
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <IntroCard />
          <div className="col-span-1 flex h-full flex-col gap-4 lg:col-span-2 lg:h-full">
            <div className="col-span-1 h-48 overflow-hidden rounded-3xl bg-card bg-gradient-to-b from-sky-50 to-zinc-100 shadow-lg dark:from-slate-200 dark:to-lime-300 lg:h-1/2">
              <TechStack />
            </div>
            <div className="col-span-1 flex h-48 items-center justify-center gap-4 lg:h-1/2">
              <div className="h-full w-1/2 rounded-3xl bg-card shadow-lg"></div>
              <div className="h-full w-1/2 rounded-3xl bg-card shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
