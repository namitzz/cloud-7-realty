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
    <section
      className="
        relative flex
        min-h-[100svh]
        sm:min-h-[800px]
        lg:min-h-screen
        items-center justify-center
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* 🎥 Background Video (mobile + desktop) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="
          absolute inset-0
          h-full w-full
          min-h-full min-w-full
          object-cover
          object-[center_40%]
          sm:object-center
        "
      >
        {/* Mobile video */}
        <source
          src="/mobile.mp4"
          type="video/mp4"
          media="(max-width: 640px)"
        />

        {/* Desktop / tablet video */}
        <source
          src="/Cloud 7.mp4"
          type="video/mp4"
          media="(min-width: 641px)"
        />
      </video>

      {/* 🌫 Mobile readability overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 sm:hidden" />

      {/* 🧭 Logo */}
      <div className="absolute top-6 left-1/2 z-30 -translate-x-1/2">
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.png"
            alt="Cloud Seven Realty"
            width={220}
            height={80}
            priority
            className="h-[52px] w-auto sm:h-[60px]"
          />
        </Link>
      </div>

      {/* 🔍 Content */}
      <div className="relative z-20 mt-28 flex w-full flex-col items-center px-4 sm:mt-36">
        {/* Search */}
        <div className="relative w-full max-w-[750px]">
          <input
            type="text"
            placeholder="Search properties, locations, communities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            aria-label="Search properties"
            className="
              w-full rounded-full
              bg-neutral-900/70 sm:bg-white/20
              backdrop-blur-md
              px-6 sm:px-8
              py-3 sm:py-4
              pr-14
              text-[15px] sm:text-[17px]
              text-white placeholder-white/80
              shadow-xl
              focus:outline-none
            "
          />

          <button
            onClick={handleSearch}
            aria-label="Search"
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              rounded-full
              p-3
              text-white
              opacity-80
              transition
              hover:opacity-100
            "
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

        {/* ⬇ Scroll Indicator */}
        <div className="mt-12 sm:mt-16">
          <Link
            href="#properties"
            aria-label="Scroll to properties"
            className="group flex flex-col items-center"
          >
            <div className="flex h-14 w-9 items-start justify-center rounded-full border border-white/40 p-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}