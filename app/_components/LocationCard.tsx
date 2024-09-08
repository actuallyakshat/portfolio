import Image from "next/image";

export function LocationCard() {
  return (
    <div className="relative min-h-64 w-full flex-1 overflow-hidden rounded-2xl bg-white shadow-xl md:h-full">
      <Image
        src={"/location.jpeg"}
        alt="location"
        layout="fill"
        objectFit="cover"
        priority
        className="size-full"
      />
    </div>
  );
}
