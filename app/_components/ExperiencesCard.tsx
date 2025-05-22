import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const ExperiencesCard = () => {
  return (
    <Link
      href={"/experience"}
      className="group relative col-span-6 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-purple-500 to-pink-600 p-6 text-center text-white shadow-sm lg:col-span-3"
    >
      <h2 className="text-2xl font-bold">My Experience</h2>
      {/* Add any other content or styling here */}
      <div className="absolute bottom-4 right-4 text-3xl text-white transition-transform duration-300 group-hover:-rotate-45">
        <ArrowRightIcon className="size-5" />
      </div>
    </Link>
  );
};
