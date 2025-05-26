import { getAge } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AgeCard() {
  return (
    <Link
      href={"https://wishly.vercel.app"}
      target="_blank"
      className="group relative col-span-6 flex basis-1/2 flex-col items-start justify-end rounded-2xl bg-white p-5 shadow-xl sm:col-span-2 lg:col-span-2"
    >
      <h2 className="text-6xl font-black">{getAge()}</h2>
      <p className="text-lg font-light uppercase tracking-tighter">years old</p>
      <p className="mt-1 text-xs italic text-muted-foreground">
        I was born in 2004
      </p>
      <div className="mt-2 text-[13px] font-light italic leading-snug text-zinc-400">
        Born in Gwalior, spent 5 years in Indore, 8 years in Mumbai. Currently
        living in Gurugram since 2022.
        <br />
        Deeply passionate about programming and building things that matter.
        <br />I firmly believe that dedication and perseverance lead to success.
      </div>
      <span className="absolute right-5 top-4">
        <ArrowRight className="size-8 stroke-[1px] transition-transform duration-500 group-hover:-rotate-45" />
      </span>
    </Link>
  );
}
