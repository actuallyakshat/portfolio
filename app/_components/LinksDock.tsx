import React from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import Image from "next/image";

const dockItems = [
  {
    name: "Github",
    href: "https://github.com/actuallyakshat",
    icon: "/github.svg",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/actuallyakshat/",
    icon: "/linkedin.svg",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/codexakshat",
    icon: "/twitter.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/actuallyakshat/",
    icon: "/instagram.svg",
  },
  { name: "Resume", href: "#", icon: "/cv.svg" },
  {
    name: "Email",
    href: "mailto:akshatdubey0808@gmail.com",
    icon: "/email.svg",
  },
];

export default function LinksDock() {
  return (
    <div>
      <Dock className="fixed bottom-10 left-1/2 z-[101] h-fit w-fit -translate-x-1/2 bg-background px-4 py-2 shadow-xl">
        {dockItems.map((item: any) => (
          <DockIcon href={item.href} key={item.name}>
            <Image
              src={"/dock-icons/" + item.icon}
              alt={item.name}
              width={60}
              height={60}
              className="aspect-square size-12 fill-white stroke-white object-cover"
            />
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
