import { Dock, DockIcon } from "@/components/ui/dock";
import {
  GithubIcon,
  HomeIcon,
  LinkedinIcon,
  MailIcon,
  RocketIcon,
  SendIcon,
  SquareUserRound,
} from "lucide-react";
import Link from "next/link";

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
    href: "https://drive.google.com/file/d/1-i3eZxEsaIEF8bX0gfJAxnrb6_MNEsDU/view?usp=sharing",
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
  return (
    <div className="fixed bottom-10 left-1/2 z-[101] -translate-x-1/2">
      <Dock
        magnification={60}
        distance={180}
        className="scale-100 border-black/20 bg-white"
      >
        {dockItems.map((item: DockItem) => (
          <DockIcon key={item.name} href={item.href} className="cursor-pointer">
            {item.icon}
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
