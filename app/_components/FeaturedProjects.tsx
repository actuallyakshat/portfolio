import Link from "next/link";

const PROJECTS = [
  {
    title: "Nota Rapida",
    description:
      "Nota Rapida is a simple note taking app that wishes to provide a minimalistic note-taking experience.",
    url: "https://nota-rapida.vercel.app",
    gradient: "bg-gradient-to-r from-sky-700 via-orange-700 to-violet-900",
  },
  {
    title: "Surf Track",
    description:
      "Surf Track is a productivity extension designed to help you monitor and manage your online activity.",
    url: "https://chromewebstore.google.com/detail/surf-track/injkidbnadfahmbcimpejmncnmogeoid",
    gradient: "bg-gradient-to-tr from-gray-500 via-gray-900 to-gray-600",
  },
  {
    title: "Zipit",
    description:
      "Zipit allows you to seamlessly share files from any device with anyone, anywhere.",
    url: "https://justzipit.vercel.app",
    gradient: "bg-gradient-to-tr from-sky-400 to-violet-900",
  },
  {
    title: "Wishly",
    description:
      "Wishly helps you set reminder for those special days you can't afford to forget.",
    url: "https://wishly.vercel.app",
    gradient: "bg-gradient-to-b from-lime-600 via-green-800 to-teal-900",
  },
];

export function FeaturedProjects() {
  return (
    <div className="relative col-span-6 overflow-hidden rounded-2xl bg-[#2a2a2a] p-6 shadow-xl lg:col-span-3">
      <div className="projects-gradient absolute inset-0 right-0 top-0 z-[1]"></div>
      <div className="flex w-full items-center justify-between">
        <h2 className="relative z-[2] text-2xl font-bold text-white md:text-4xl">
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
        {PROJECTS.map((project: any) => (
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
        className={`relative flex h-[100px] items-center justify-center overflow-hidden ${gradient}`}
      >
        <h2 className="z-[1] text-3xl font-black text-white">{title}</h2>
      </div>
      <div className="bg-white p-4">
        <p className="text-sm">{description}</p>
      </div>
    </Link>
  );
}
