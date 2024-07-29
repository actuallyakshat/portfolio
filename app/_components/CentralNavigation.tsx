"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
];

export default function CentralNavigation() {
  const pathname = usePathname();
  return (
    <nav className="flex w-full max-w-lg rounded-full border-2 bg-background text-center shadow-lg">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`w-full overflow-hidden rounded-full px-3 py-2 font-medium ${
            pathname === item.href ? "bg-primary/5 dark:bg-muted" : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
