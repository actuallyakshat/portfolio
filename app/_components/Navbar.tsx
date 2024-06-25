import React from "react";
import ThemeToggler from "./ThemeToggler";
import CentralNavigation from "./CentralNavigation";
import ShinyButton from "@/components/magicui/shiny-button";
import MobileNavigation from "./MobileNavigation";

export default function Navbar() {
  return (
    <nav className="fixed flex h-20 w-full lg:h-28">
      <div className="hidden w-full items-center justify-around px-6 lg:flex">
        <ThemeToggler />
        <CentralNavigation />
        <ShinyButton text="Contact" />
      </div>
      <div className="flex w-full items-center justify-end px-6 lg:hidden">
        <MobileNavigation />
      </div>
    </nav>
  );
}
