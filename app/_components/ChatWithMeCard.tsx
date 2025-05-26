import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"] });

export function ChatWithMeCard() {
  return (
    <Link
      href="/chat"
      className="group relative flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-white/30 bg-white/80 p-6 shadow-xl backdrop-blur-md transition-all duration-700 hover:bg-zinc-100 hover:shadow-2xl"
      style={{
        boxShadow:
          "0 4px 24px 0 rgba(0,0,0,0.08), 0 1.5px 4px 0 rgba(0,0,0,0.03)",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <span className="flex items-center justify-center rounded-full bg-white/80 p-4 text-rose-500 shadow transition group-hover:bg-rose-50">
          <MessageCircle className="size-8" />
        </span>
        <span
          className={`${caveat.className} text-center text-[2.5rem] font-light text-gray-900`}
        >
          Chat
        </span>
        <ArrowRight className="absolute right-4 top-4 size-4 transition-transform duration-300 group-hover:-rotate-45" />
      </div>
    </Link>
  );
}
