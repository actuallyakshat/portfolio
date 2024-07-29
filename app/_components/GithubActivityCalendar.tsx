"use client";
import { useTheme } from "next-themes";
import React from "react";
import GitHubCalendar, { ThemeInput } from "react-github-calendar";

const explicitTheme: ThemeInput = {
  light: ["#f0f0f0", "#F48E7C", "#F16D55", "#EE4C2F", "#BC2A10"],
  dark: ["#383838", "#F48E7C", "#F16D55", "#EE4C2F", "#BC2A10"],
};

export default function GithubActivityCalendar() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  return (
    <div className="github-calendar col-span-2 flex h-fit flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-card px-10 py-6 shadow-xl">
      <GitHubCalendar
        username="actuallyakshat"
        colorScheme={theme as "light" | "dark"}
        theme={explicitTheme}
        year={currentYear}
      />
    </div>
  );
}
