"use client";
import React from "react";
import GitHubCalendar from "react-github-calendar";

const explicitTheme = {
  // light: ["#f0f0f0", "#F48E7C", "#F16D55", "#EE4C2F", "#BC2A10"],
};

export default function GithubActivityCalendar() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="github-calendar flex h-fit w-fit flex-col gap-4 overflow-hidden rounded-2xl bg-white px-10 py-6 shadow-xl">
      <span className="flex items-center gap-3">
        <h2 className="bg-gradient-to-b from-emerald-400 to-green-900 bg-clip-text pb-1 text-4xl font-black text-transparent">
          Github Activity Calendar
        </h2>
        <p className="text-sm font-light text-muted-foreground">
          @actuallyakshat
        </p>
      </span>

      <GitHubCalendar
        username="actuallyakshat"
        colorScheme="light"
        // theme={explicitTheme}
        year={currentYear}
      />
    </div>
  );
}
