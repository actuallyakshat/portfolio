import Image from "next/image";
import React from "react";

export default function IntroCard() {
  return (
    <div className="col-span-1 grid min-h-[23rem] grid-cols-1 gap-6 rounded-3xl bg-card p-8 shadow-lg lg:col-span-3 lg:grid-cols-5">
      <div className="order-1 col-span-2 flex items-center justify-center overflow-hidden rounded-lg lg:inline-block">
        <Image
          src="/akshat-main.jpeg"
          alt="Akshat Dubey"
          width={600}
          height={600}
          className="col-span-1 aspect-square h-full max-w-[300px] scale-[1.6] rounded-lg object-cover object-[center_70%] transition-transform duration-300 hover:shadow-md lg:w-full"
          placeholder="blur"
          blurDataURL="/akshat-main.jpeg"
        />
      </div>
      <div className="order-2 col-span-1 lg:order-1 lg:col-span-3">
        <h2 className="text-lg font-medium text-muted-foreground">
          Hey There! My name is
        </h2>
        <h1 className="bg-gradient-to-b from-rose-400 to-orange-600 bg-clip-text pb-1 text-4xl font-black text-transparent lg:text-5xl">
          Akshat Dubey
        </h1>
        <p className="max-w-lg text-muted-foreground">
          I am a software engineer with a passion for building scalable and
          performant applications. I have a proficient understanding of
          development, particularly React and Next.js, and I am always looking
          for new challenges to push my skills to the next level.
        </p>
      </div>
    </div>
  );
}
