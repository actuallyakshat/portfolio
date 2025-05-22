import Link from "next/link";

const PROJECTS = [
  {
    title: "CineVault",
    description:
      "CineVault: A sleek digital library for movie lovers with collaborative boards, watchlists and more",
    url: "https://cinevault.actuallyakshat.in",
    gradient: "bg-gradient-to-r from-zinc-700 via-slate-800 to-zinc-900",
  },
  {
    title: "Zipit",
    description:
      "Zipit allows you to seamlessly share files from any device with anyone, anywhere.",
    url: "https://zipit.actuallyakshat.in",
    gradient: "bg-gradient-to-tr from-sky-400 to-violet-900",
  },
  // {
  //   title: "Bingo Bond",
  //   description:
  //     "Bingo Bond allows users to collaboratively populate bingo cards with planned activities",
  //   url: "https://bingobond.actuallyakshat.in",
  //   gradient: "bg-gradient-to-tr from-pink-600 via-rose-800 to-pink-400",
  // },
  // {
  //   title: "Wishly",
  //   description:
  //     "Wishly helps you set reminder for those special days you can't afford to forget.",
  //   url: "https://wishly.actuallyakshat.in",
  //   gradient: "bg-gradient-to-b from-lime-600 via-green-800 to-teal-900",
  // },
];

export function FeaturedProjects() {
  return (
    <div className="relative h-full flex-1 overflow-hidden rounded-2xl bg-[#1e1e1e] p-5 shadow-xl backdrop-blur-md lg:col-span-3">
      <div className="projects-gradient absolute inset-0 right-0 top-0 z-[1]"></div>
      <div className="flex w-full items-center justify-between">
        <h2 className="relative z-[2] text-2xl font-bold text-white md:text-3xl">
          Featured Projects
        </h2>
        <Link
          href={"/projects"}
          className="relative z-[1] text-sm font-medium text-white hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
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
      className="group relative z-[1] col-span-1 overflow-hidden rounded-xl"
    >
      <div
        className={`relative flex items-center justify-center overflow-hidden p-4 ${gradient}`}
      >
        <h2 className="z-[1] text-center text-2xl font-black text-white sm:text-3xl">
          {title}
        </h2>
      </div>
      <div className="bg-white p-4">
        <p className="text-sm">{description}</p>
      </div>
    </Link>
  );
}
