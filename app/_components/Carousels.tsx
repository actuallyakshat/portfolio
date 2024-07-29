import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
const locationAndSocialsCard = [
  "location.jpeg",
  "github.svg",
  "twitter.svg",
  "linkedin.svg",
  "instagram.svg",
];
export default function Carousels() {
  return (
    <div className="col-span-1 flex h-48 items-center justify-center gap-4 lg:h-1/2">
      <div className="h-full w-1/2 overflow-hidden rounded-3xl bg-card shadow-lg">
        <Carousel
          opts={{
            loop: true,
          }}
          className="h-full w-full flex-1"
        >
          <CarouselContent className="m-0 h-full w-full flex-1 p-0">
            {locationAndSocialsCard.map((image, i) => (
              <CarouselItem key={i} className="m-0 p-0">
                <div className="h-full w-full bg-card p-0">
                  <Image
                    src={
                      image == "location.jpeg"
                        ? "/location.jpeg"
                        : "/dock-icons/" + image
                    }
                    alt={image}
                    width={800}
                    height={800}
                    className={`h-full w-full object-cover`}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
                    className={`aspect-square w-full object-cover ${i == 1 || i == 3 ? "object-center" : "object-[center_100%]"}`}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
