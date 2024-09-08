import Image from "next/image";
import Link from "next/link";

export function BestPerformerCard() {
  return (
    <Link
      target="_blank"
      href={
        "https://www.linkedin.com/posts/actuallyakshat_gratitude-academicachievement-activity-7159840099206107136-rbo3?utm_source=share&utm_medium=member_desktop"
      }
      className="relative min-h-56 flex-1 overflow-hidden rounded-2xl bg-white p-4 shadow-xl md:h-full"
    >
      <Image
        src={"/bestperformer.jpeg"}
        alt="Best Performer in SCSET Award"
        layout="fill"
        objectFit="cover"
        className="aspect-square object-cover"
      />
    </Link>
  );
}
