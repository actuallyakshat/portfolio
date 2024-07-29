import React from "react";
import IntroCard from "./IntroCard";
import Carousels from "./Carousels";
import SkillsMarquee from "./SkillsMarquee";

export default function FirstRow() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <IntroCard />
      <div className="col-span-1 flex h-full flex-col gap-4 lg:col-span-2 lg:h-full">
        {/* <Carousels /> */}
        <SkillsMarquee />
        <SkillsMarquee />
      </div>
    </div>
  );
}
