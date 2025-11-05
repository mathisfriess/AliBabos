"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="w-full bg-white/60 backdrop-blur-sm border-b border-black/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-24">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-linear-to-b from-black to-emerald-200 rounded-full" />
              <span className="text-lg font-medium text-neutral-800">
                AliBabos
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-4rem)] py-16">
          {/* Hero Section */}
          <div className="flex-1 space-y-8 lg:pr-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-black/10 rounded-full px-4 py-2">
              <div className="w-4 h-4 relative">
                <div className="absolute inset-1 border border-black rounded-full" />
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-3 border-l border-black" />
                <div className="absolute top-1/2 right-1 transform -translate-y-1/2 w-3 h-0 border-t border-black" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 border border-black" />
              </div>
              <span className="text-sm font-medium text-black">
                No Code Required
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight">
              Create Your Dream Website in Minutes
            </h1>

            {/* Description */}
            <p className="text-lg text-stone-500 max-w-md leading-relaxed">
              Build stunning, professional websites with our intuitive
              drag-and-drop builder. No coding skills needed. Choose from
              beautiful templates, customize everything, and launch instantly.
            </p>

            {/* CTA Button */}
            <Button
              onClick={handleLogin}
              className="bg-black hover:bg-black/90 text-white px-6 py-3 rounded-full shadow-lg"
            >
              Start Building Free
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>

          {/* Image Section */}
          <div className="flex-1 relative mt-12 lg:mt-0">
            <div className="relative rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto">
              <Image
                src="/home-picture.jpg"
                width={500}
                height={500}
                alt="Home picture"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -left-6 bottom-8 bg-white rounded-2xl shadow-xl border border-black/10 p-4 max-w-xs">
              <h3 className="text-stone-500 font-medium mb-1">Launch Fast</h3>
              <p className="text-neutral-800 font-medium">
                Go live in 5 minutes
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
