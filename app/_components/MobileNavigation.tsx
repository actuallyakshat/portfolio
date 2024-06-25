"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

import React from "react";
import ThemeToggler from "./ThemeToggler";
import ShinyButton from "@/components/magicui/shiny-button";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
];

export default function MobileNavigation() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="bg-gradient-to-b from-rose-400 to-orange-600 bg-clip-text pb-1 pt-6 text-4xl font-black text-transparent">
            Akshat Dubey
            <div className="flex items-center justify-center py-3">
              <ShinyButton text="Contact Me" />
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col justify-between px-3">
          <div className="flex flex-col gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`w-full overflow-hidden rounded-full text-xl font-medium active:underline ${pathname === item.href ? "text-rose-500" : "text-muted-foreground"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-start justify-start gap-6 pb-3">
            <ThemeToggler />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
