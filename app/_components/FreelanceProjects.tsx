import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FREELANCE_PROJECTS = [
  {
    title: "Sai Logistics",
    url: "https://sai-logistics.vercel.app",
    image: "/freelance-projects/sailogistics.png",
  },
  {
    title: "AR Design Studio",
    url: "https://ar-design-studio.vercel.app",
    image: "/freelance-projects/ar.png",
  },
];

export function FreelanceProjects() {
  return (
    <div className="col-span-2 flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-b from-slate-100 via-slate-500 to-slate-100 p-4 shadow-xl">
      <h2 className="text-xl font-semibold uppercase">Freelance Projects</h2>
      <div className="flex h-full flex-1 flex-col gap-3">
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
      className="group relative h-full min-h-24 w-full flex-1 overflow-hidden rounded-xl"
    >
      <Image
        src={image}
        alt="Sai Logistics"
        layout="fill"
        objectFit="cover"
        className="aspect-square object-cover object-top blur-[1.5px]"
      />
      <div className="absolute inset-0 flex items-end justify-start bg-black/30 p-4 text-2xl font-semibold text-white transition-colors group-hover:bg-black/70">
        <span className="flex items-center gap-3">
          {title}{" "}
          <ArrowRight className="size-5 transition-transform duration-500 group-hover:-rotate-45" />
        </span>
      </div>
    </Link>
  );
}
