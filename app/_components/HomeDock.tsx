"use client";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  BriefcaseBusinessIcon,
  GithubIcon,
  HomeIcon,
  LinkedinIcon,
  MailIcon,
  MessageCircleIcon,
  RocketIcon,
  SendIcon,
  SquareUserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface DockItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const dockItems = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Experience",
    href: "/experience",
    icon: <BriefcaseBusinessIcon />,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: <MessageCircleIcon />,
  },
  {
    name: "Github",
    href: "https://github.com/actuallyakshat",
    icon: <GithubIcon />,
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/actuallyakshat/",
    icon: <LinkedinIcon />,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: <RocketIcon />,
  },
  {
    name: "Resume",
    href: "https://drive.google.com/file/d/1w7koesdJhXb8Zt4TeEOPnq4eHoSevmh8/view?usp=sharing",
    icon: <SquareUserRound />,
  },
  {
    name: "Contact",
    href: "/contact",

    icon: <SendIcon />,
  },
  {
    name: "Email",
    href: "mailto:akshatdubey0808@gmail.com",
    icon: <MailIcon />,
  },
];

export function HomeDock() {
  const pathname = usePathname();
  if (pathname === "/chat") return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[101] -translate-x-1/2 md:bottom-10 md:w-auto">
      <Dock
        magnification={60}
        distance={180}
        className="scale-90 border-black/20 bg-white md:scale-100"
      >
        {dockItems.map((item: DockItem) => (
          <DockIcon
            key={item.name}
            href={item.href}
            tooltip={item.name}
            className="cursor-pointer"
          >
            {item.icon}
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
