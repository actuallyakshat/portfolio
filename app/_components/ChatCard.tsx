import React from "react";
import { ArrowRightIcon } from "lucide-react"; // Import the arrow icon
import Link from "next/link";

export const ChatCard = () => {
  return (
    <Link
      href={"/chat"}
      className="group relative col-span-6 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-center text-white shadow-sm lg:col-span-3"
    >
      <h2 className="text-2xl font-bold">Chat with me</h2>
      {/* Add any other content or styling here */}
      {/* Add the arrow icon */}
      <div className="absolute bottom-4 right-4 text-3xl text-white transition-transform duration-300 group-hover:-rotate-45">
        <ArrowRightIcon className="size-5" /> {/* Use the imported icon */}
      </div>
    </Link>
  );
};
