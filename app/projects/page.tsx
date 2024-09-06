import { Badge } from "@/components/ui/badge";
import { Github, Globe } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Projects() {
  return (
    <main className="relative px-8 pb-32">
      <Link
        href={"/"}
        className="fixed right-12 top-8 text-sm font-medium hover:underline"
      >
        Back to portfolio
      </Link>
      <div className="pt-24">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl/none">
            My Projects
          </h1>
          <p className="mt-2 text-lg tracking-tight text-muted-foreground">
            I&apos;ve always tried to solve problems that I have faced
            personally. <br />
            Here are some of them.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-screen-sm grid-cols-1 gap-3 sm:grid-cols-2">
          <DetailedProjectCard />
          <DetailedProjectCard />
          <DetailedProjectCard />
          <DetailedProjectCard />
        </div>
      </div>
    </main>
  );
}

function DetailedProjectCard() {
  const techStack = [
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Docker",
  ];

  const links = [
    { name: "Website", href: "#", icon: <Globe className="size-3" /> },
    {
      name: "Source",
      href: "#",
      icon: <Github className="size-3" />,
    },
  ];

  return (
    <div className="col-span-1 overflow-hidden rounded-3xl bg-white">
      <div className="h-[160px] bg-zinc-800"></div>
      <div className="p-4">
        <h2 className="font-bold">Project Title</h2>
        <h4 className="py-1 text-sm">Jan 2024</h4>
        <p className="text-xs text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          elementum, nulla sed elementum varius, nisi est eget nisi, vel
          tincidunt nisi erat eget nisi. Donec euismod, nisi euismod.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-1">
          {techStack.map((tech, index) => (
            <Badge
              key={index}
              className="rounded-sm text-[10px]"
              variant={"secondary"}
            >
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          {links.map((link, index) => (
            <Link href={link.href} key={index}>
              <Badge className="flex items-center gap-2 rounded-sm py-1 text-[11px]">
                {link.icon} {link.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
