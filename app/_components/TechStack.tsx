import Marquee from "@/components/magicui/marquee";
import React from "react";

const tools = [
  {
    tooltip: "Next.js",
    icon: "nextjs.svg",
  },
  {
    tooltip: "React",
    icon: "react.svg",
  },
  {
    tooltip: "TypeScript",
    icon: "typescript.svg",
  },
  {
    tooltip: "Node.js",
    icon: "nodejs.svg",
  },
  {
    tooltip: "Express",
    icon: "express.svg",
  },
  {
    tooltip: "MongoDB",
    icon: "mongodb.svg",
  },
  {
    tooltip: "Docker",
    icon: "docker.svg",
  },
  {
    tooltip: "GitHub",
    icon: "github.svg",
  },
  {
    tooltip: "C++",
    icon: "cplusplus.svg",
  },
  {
    tooltip: "JavaScript",
    icon: "javascript.svg",
  },
  {
    tooltip: "Drizzle",
    icon: "drizzle.svg",
  },
  {
    tooltip: "Prisma",
    icon: "prisma.svg",
  },
  {
    tooltip: "JWT",
    icon: "jwt.svg",
  },
  {
    tooltip: "Supabase",
    icon: "supabase.svg",
  },
  {
    tooltip: "Tailwind",
    icon: "tailwind.svg",
  },
  {
    tooltip: "Vercel",
    icon: "vercel.svg",
  },
  {
    tooltip: "PostgreSQL",
    icon: "postgresql.svg",
  },
  {
    tooltip: "Postman",
    icon: "postman.svg",
  },
  {
    tooltip: "VS Code",
    icon: "vscode.svg",
  },
  {
    tooltip: "Git",
    icon: "git.svg",
  },
];
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

const firstRow = tools.slice(0, tools.length / 2);
const secondRow = tools.slice(tools.length / 2);

export default function TechStack() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 py-3">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <TooltipProvider key={review.tooltip}>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src={`/tech-icons/${review.icon}`}
                  alt={review.tooltip}
                  width={60}
                  height={60}
                  className="relative z-[1] h-[50px] w-[50px]"
                />
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-card">
                <p>{review.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <TooltipProvider key={review.tooltip}>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src={`/tech-icons/${review.icon}`}
                  alt={review.tooltip}
                  width={60}
                  height={60}
                  className="h-[50px] w-[50px]"
                />
              </TooltipTrigger>
              <TooltipContent className="absolute z-[101] bg-card">
                <p>{review.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </Marquee>
    </div>
  );
}
