import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  {
    title: "Daily 150",
    description:
      "Daily 150 is a journaling app that encourages you to write 150 words every day. Every Monday, your entries from the past week are summarised using Gemini 1.5 Flash.",
    url: "https://daily150.actuallyakshat.in",
    gradient: "bg-gradient-to-tr from-neutral-700 to-red-700",
  },
  {
    title: "Multiplayer Wordle",
    description:
      "A real-time multiplayer Wordle game built with Go on the backend and Vite + React on the frontend. Challenge your friends, see their guesses live, and race to crack the word first.",
    url: "https://wordle.actuallyakshat.in",
    gradient: "bg-gradient-to-tr from-emerald-900 to-cyan-900",
  },
  {
    title: "CineVault",
    description:
      "CineVault: A sleek digital library for movie lovers with collaborative boards, watchlists and more. Discover, track, and share your favorite films with ease.",
    url: "https://cinevault.actuallyakshat.in",
    gradient: "bg-gradient-to-r from-slate-700 to-zinc-900",
  },
  {
    title: "Zipit",
    description:
      "Zipit allows you to seamlessly share files from any device with anyone, anywhere. Experience fast and secure file transfers without any hassle.",
    url: "https://zipit.actuallyakshat.in",
    gradient: "bg-gradient-to-tr from-sky-700 to-violet-950",
  },
];

export function FeaturedProjects() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#1e1e1e] p-5 shadow-xl backdrop-blur-md lg:col-span-3 lg:flex-[2]">
      <div className="projects-gradient absolute inset-0 right-0 top-0 z-[1]"></div>
      <div className="mb-4 flex w-full items-center justify-between">
        <h2 className="relative z-[2] text-2xl font-bold text-white md:text-3xl">
          Featured Projects
        </h2>
        <Link
          href={"/projects"}
          className="group relative z-[2] flex items-center gap-1.5 text-sm font-medium text-white hover:underline"
        >
          View All
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="relative z-[2] grid auto-rows-fr grid-cols-1 gap-4 lg:grid-cols-2">
        {PROJECTS.map((project) => (
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
      className="group relative flex flex-col overflow-hidden rounded-xl transition-transform hover:scale-[1.02]"
    >
      <div
        className={`relative flex items-center justify-center p-6 ${gradient} min-h-[120px]`}
      >
        <h2 className="z-[1] text-center text-xl font-black text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h2>
      </div>
      <div className="flex-1 bg-white p-4">
        <p className="text-xs leading-relaxed text-gray-700">{description}</p>
      </div>
    </Link>
  );
}
