import { getAge } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AgeCard() {
  return (
    <Link
      href={"https://wishly.vercel.app"}
      target="_blank"
      className="group relative col-span-6 flex flex-col items-start justify-end rounded-2xl bg-white p-5 shadow-xl sm:col-span-2 lg:col-span-1"
    >
      <h2 className="text-6xl font-black">{getAge()}</h2>
      <p className="text-lg font-light uppercase">years old</p>
      <p className="text-xs italic text-muted-foreground">I was born in 2004</p>

      <span className="absolute right-5 top-4">
        <ArrowRight className="size-8 stroke-[1px] transition-transform duration-500 group-hover:-rotate-45" />
      </span>
    </Link>
  );
}
