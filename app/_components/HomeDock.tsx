import { Dock, DockIcon } from "@/components/ui/dock";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface DockItem {
  name: string;
  href: string;
  icon: string;
}

const dockItems = [
  {
    name: "Github",
    href: "https://github.com/actuallyakshat",
    icon: "/dock-icons/github.png",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/actuallyakshat/",
    icon: "/dock-icons/linkedin.png",
  },
  {
    name: "Projects",
    href: "/projects",
    icon: "/dock-icons/project.png",
  },
  { name: "Resume", href: "#", icon: "/dock-icons/cv.png" },
  {
    name: "Email",
    href: "mailto:akshatdubey0808@gmail.com",
    icon: "/dock-icons/email.png",
  },
];

export function HomeDock() {
  return (
    <div className="fixed bottom-10 left-1/2 z-[101] -translate-x-1/2">
      <Dock
        magnification={65}
        distance={180}
        className="scale-110 border-black/20 bg-white"
      >
        {dockItems.map((item: DockItem) => (
          <DockIcon key={item.name}>
            <Link
              href={item.href}
              target={item.href === "/projects" ? "_self" : "_blank"}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={1080}
                priority
                height={1080}
                className="aspect-square"
              />
            </Link>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
