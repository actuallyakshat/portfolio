import Image from "next/image";
import Link from "next/link";

export function BounceBackCard() {
  return (
    <Link
      target="_blank"
      href={
        "https://www.linkedin.com/posts/actuallyakshat_selfhelp-productivity-lifestyle-activity-7047222492318314497-pFN1?utm_source=share&utm_medium=member_desktop"
      }
      className="group relative h-fit overflow-hidden rounded-2xl bg-white shadow-xl"
    >
      <Image
        src={"/bounceback.png"}
        alt="Bounce Back"
        width={1080}
        height={1080}
        className="h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 px-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="text-center italic text-white">
          i wrote a self help book
        </p>
      </div>
    </Link>
  );
}
