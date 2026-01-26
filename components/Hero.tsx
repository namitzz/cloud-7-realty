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
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Video wrapper */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-[#2a2f33]
          via-[#3a3f44]
          to-[#2a2f33]
          sm:bg-none
        "
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="
            absolute inset-0 h-full w-full
            object-contain sm:object-cover
          "
        >
          <source src="/Cloud 7.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.png"
            alt="Logo"
            width={220}
            height={80}
            priority
            className="h-[56px] sm:h-[60px] w-auto"
          />
        </Link>
      </div>

      {/* Search */}
      <div className="relative z-20 mt-40 sm:mt-36 flex flex-col items-center px-4 w-full">
        <div className="relative w-full max-w-[750px]">
          <input
            type="text"
            placeholder="Search properties, locations, communities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="
              w-full
              rounded-full
              bg-white/25
              backdrop-blur-xl
              px-6 sm:px-8
              py-4
              pr-14
              text-[16px]
              text-white
              placeholder-white/90
              shadow-[0_8px_40px_rgba(0,0,0,0.2)]
              focus:outline-none
            "
          />

          <button
            onClick={handleSearch}
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              rounded-full p-3 text-white
              hover:opacity-80 transition
            "
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
        <div className="mt-14 sm:mt-16">
          <Link href="#properties" aria-label="Scroll">
            <div className="flex h-14 w-9 items-start justify-center rounded-full border border-white/40 p-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}