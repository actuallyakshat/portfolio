import React from "react";
import IntroCard from "./IntroCard";
import TechStack from "./TechStack";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function FirstRow() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <IntroCard />
      <div className="col-span-1 flex h-full flex-col gap-4 lg:col-span-2 lg:h-full">
        <div className="col-span-1 h-48 overflow-hidden rounded-3xl bg-card bg-gradient-to-b from-sky-50 to-zinc-100 shadow-lg dark:from-slate-200 dark:to-lime-400 lg:h-1/2">
          <TechStack />
        </div>
        <div className="col-span-1 flex h-48 items-center justify-center gap-4 lg:h-1/2">
          <div className="h-full w-1/2 overflow-hidden rounded-3xl bg-card shadow-lg">
            <Image
              src={"/location.jpeg"}
              alt="location"
              width={400}
              height={400}
              className="objct-cover aspect-square object-[center_60%]"
            />
          </div>
          <div className="flex h-full w-1/2 overflow-hidden rounded-3xl bg-card shadow-lg">
            <Carousel
              opts={{
                loop: true,
              }}
              className="h-full w-full flex-1"
            >
              <CarouselContent className="m-0 h-full w-full flex-1 p-0">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CarouselItem key={i} className="m-0 p-0">
                    <div className="h-full w-full flex-1 bg-card p-0">
                      <Image
                        src={"/setup/" + (i + 1) + ".jpeg"}
                        alt="setup image"
                        width={400}
                        height={400}
                        blurDataURL={"/setup/" + (i + 1) + ".jpeg"}
                        placeholder="blur"
                        className={`aspect-square w-full object-cover ${i == 1 || i == 3 ? "object-center" : "object-[center_100%]"}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
