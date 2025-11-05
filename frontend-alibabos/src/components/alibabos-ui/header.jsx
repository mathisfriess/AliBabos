import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export function HeaderNotConnected() {
  return (
    <header className="w-full bg-white/60 backdrop-blur-sm border-b border-black/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-24">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-linear-to-b from-black to-emerald-200 rounded-full" />
            <span className="text-lg font-medium text-neutral-800">
              AliBabos
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function HeaderConnected() {
  return (
    <header className="bg-white/60 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-gradient-to-b from-black to-emerald-200 rounded-full" />
          <span className="text-base font-medium text-gray-800">AliBabos</span>
        </Link>
        <Link href="/profile">
          <Avatar className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarFallback className="bg-gradient-to-b from-black to-emerald-200 text-white">
              J
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
