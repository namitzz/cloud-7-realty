"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/properties?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative min-h-[700px] sm:min-h-[800px] lg:min-h-[100vh] flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Fullscreen video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/Cloud 7.mp4" type="video/mp4" />
      </video>

      {/* Logo */}
      <div className="absolute top-8 left-[50.5%] -translate-x-1/2 z-30">
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.png"
            alt="Logo"
            width={220}
            height={80}
            priority
            className="h-[60px] w-auto"
          />
        </Link>
      </div>

      {/* Search Section */}
      <div className="relative z-20 mt-36 flex flex-col items-center justify-center px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search properties, locations, communities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-[750px] max-w-full rounded-full bg-white/20 backdrop-blur-xl backdrop-saturate-150 px-8 py-4 pr-16 text-[17px] text-white placeholder-white/90 shadow-[0_4px_30px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-0"
            aria-label="Search properties"
          />

          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-4 text-white hover:opacity-80 transition"
            aria-label="Search"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <Link
            href="#properties"
            aria-label="Scroll to properties"
            className="group inline-flex flex-col items-center"
          >
            <div className="flex h-16 w-10 items-start justify-center rounded-full border-2 border-white/50 p-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
