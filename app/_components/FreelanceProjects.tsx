import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FREELANCE_PROJECTS = [
  {
    title: "Primus AgroCom",
    url: "https://primusagri.com",
    image: "/freelance-projects/primus.png",
  },
  {
    title: "Glinterra",
    url: "https://glinterra.in",
    image: "/freelance-projects/glinterra.png",
  },
  {
    title: "AR Design Studio",
    url: "https://ar-design-studio.in",
    image: "/freelance-projects/ar.png",
  },
];

export function FreelanceProjects() {
  return (
    <div className="border-dash col-span-2 flex h-fit flex-col gap-4 rounded-2xl border bg-opacity-80 bg-gradient-to-b from-zinc-800 to-slate-700 px-5 py-4 shadow-2xl backdrop-blur-md">
      <h2
        className={`bg-gradient-to-t from-slate-200 to-slate-50 bg-clip-text text-2xl font-medium text-transparent drop-shadow-lg`}
      >
        Freelance Projects
      </h2>
      <div className="grid h-full flex-1 grid-cols-2 gap-4">
        {FREELANCE_PROJECTS.map((project: any) => (
          <FreelanceProjectCard
            key={project.title}
            title={project.title}
            url={project.url}
            image={project.image}
          />
        ))}
      </div>
    </div>
  );
}

function FreelanceProjectCard({
  title,
  url,
  image,
}: {
  title: string;
  url: string;
  image: string;
}) {
  return (
    <Link
      href={url}
      target="_blank"
      className="group relative h-full min-h-24 w-full flex-1 grid-cols-1 overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="aspect-square object-cover object-top blur-[0.5px]"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity group-hover:opacity-80" />
      <div className="absolute inset-0 z-20 flex items-end justify-start p-4 font-semibold text-white">
        <span className="flex items-center gap-3 text-lg drop-shadow-md">
          {title}{" "}
          <ArrowRight className="size-5 transition-transform duration-500 group-hover:-rotate-45" />
        </span>
      </div>
    </Link>
  );
}
