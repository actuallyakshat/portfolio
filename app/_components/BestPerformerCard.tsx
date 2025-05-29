import Image from "next/image";
import Link from "next/link";

export function BestPerformerCard() {
  return (
    <Link
      target="_blank"
      href={
        "https://www.linkedin.com/posts/actuallyakshat_gratitude-academicachievement-activity-7159840099206107136-rbo3?utm_source=share&utm_medium=member_desktop"
      }
      className="group relative max-h-60 min-h-72 flex-1 overflow-hidden rounded-2xl bg-white p-4 shadow-xl lg:h-full lg:min-h-0"
    >
      <Image
        src={"/bestperformer.jpeg"}
        alt="Best Performer in SCSET Award"
        fill
        className="aspect-square object-cover object-[center_35%]"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 px-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="text-center italic text-white">
          i won the dean&apos;s list award thrice :{")"}
        </p>
      </div>
    </Link>
  );
}
