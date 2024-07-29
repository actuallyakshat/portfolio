import React from "react";
import TechStack from "./TechStack";

export default function SkillsMarquee() {
  return (
    <div className="dark:from-slate-slate-50 col-span-1 flex-1 overflow-hidden rounded-3xl bg-card bg-gradient-to-b from-sky-50 to-zinc-100 shadow-lg dark:to-zinc-500">
      <TechStack />
    </div>
  );
}
