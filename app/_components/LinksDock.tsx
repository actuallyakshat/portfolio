import React from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";

const dockItems = [
  {
    name: "Github",
    href: "https://github.com/actuallyakshat",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/actuallyakshat/",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/codexakshat",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/actuallyakshat/",
  },
  { name: "Resume", href: "#" },
];

export default function LinksDock() {
  return (
    <div>
      <Dock className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white">
        {dockItems.map((item: any) => (
          <DockIcon href={item.href} key={item.name} className="">
            <h1>{item.name}</h1>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
