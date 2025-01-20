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
      className="relative w-full overflow-hidden rounded-2xl shadow-xl sm:w-full lg:w-1/4 xl:h-full"
    >
      <CarouselContent className="relative m-0 w-full p-0 xl:h-full">
        {Array.from({ length: 15 }).map((_, i) => (
          <CarouselItem
            key={i}
            className="relative m-0 h-72 p-0 sm:min-h-[40rem] lg:h-72 lg:min-h-0"
          >
            <Image
              quality={60}
              src={"/setup/" + (i + 1) + ".jpg"}
              alt="setup image"
              fill
              className="size-full bg-muted object-cover object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-white" />
      <CarouselNext className="text-white" />
    </Carousel>
  );
}
