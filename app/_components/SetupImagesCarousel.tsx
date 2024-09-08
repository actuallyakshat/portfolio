import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function SetupImagesCarousel() {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className="relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl md:w-1/4"
    >
      <CarouselContent className="relative m-0 h-full w-full p-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <CarouselItem key={i} className="relative m-0 h-72 p-0">
            <Image
              src={"/setup/" + (i + 1) + ".jpeg"}
              alt="setup image"
              objectFit="cover"
              layout="fill"
              className="size-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-white" />
      <CarouselNext className="text-white" />
    </Carousel>
  );
}
