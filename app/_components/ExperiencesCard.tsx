import { Ripple } from "@/components/magicui/ripple";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export const ExperiencesCard = () => {
  return (
    <Link
      href={"/experience"}
      className="group relative col-span-3 aspect-square h-full basis-1/2 overflow-hidden rounded-2xl bg-white"
    >
      <ArrowRightIcon className="absolute right-4 top-4 text-4xl text-zinc-900 transition-transform duration-300 group-hover:-rotate-45" />
      <Ripple className="scale-105" />
      <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-zinc-900 to-slate-700 bg-clip-text text-center text-[2.75rem] font-extrabold text-transparent">
        Experience
      </h2>
    </Link>
  );
};
