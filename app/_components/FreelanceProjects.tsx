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
    <div className="col-span-2 flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-tl from-zinc-100 to-zinc-600 px-5 py-4 shadow-xl">
      <h2 className="text-2xl font-black tracking-wide text-gray-100">
        Freelance Projects
      </h2>
      <div className="grid h-full flex-1 grid-cols-2 gap-3">
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
      className="group relative h-full min-h-24 w-full flex-1 grid-cols-1 overflow-hidden rounded-xl"
    >
      <Image
        src={image}
        alt="Sai Logistics"
        fill
        className="aspect-square object-cover object-top blur-[0.5px]"
      />
      <div className="absolute inset-0 flex items-end justify-start bg-black/40 p-4 font-semibold text-white transition-colors group-hover:bg-black/40">
        <span className="flex items-center gap-3">
          {title}{" "}
          <ArrowRight className="size-5 transition-transform duration-500 group-hover:-rotate-45" />
        </span>
      </div>
    </Link>
  );
}
