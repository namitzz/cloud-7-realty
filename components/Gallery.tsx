"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface GalleryProps {
  images: { url: string; alt: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  /* ------------------ helpers ------------------ */
  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = () => setOpen(false);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  /* ------------------ body lock ------------------ */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ------------------ keyboard ------------------ */
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  /* ------------------ swipe ------------------ */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    touchStartX.current = null;
  };

  return (
    <>
      {/* ================= GRID ================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px]">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openAt(i)}
            className={`
              relative overflow-hidden rounded-xl bg-neutral-200 group
              focus:outline-none focus:ring-2 focus:ring-luxury-gold
              ${i === 0 ? "col-span-2 row-span-2" : ""}
            `}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="
                object-cover
                transition-transform duration-700 ease-out
                group-hover:scale-[1.035]
              "
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>

      {/* ================= LIGHTBOX ================= */}
      {open && (
        <div
          ref={modalRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          onKeyDown={onKey}
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/90 backdrop-blur-sm
            animate-[fadeIn_.25s_ease-out]
          "
        >
          {/* Close */}
          <button
            onClick={close}
            className="
              absolute top-6 right-6
              text-white/70 hover:text-white
              text-2xl transition
            "
            aria-label="Close"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="
              absolute left-6
              text-white/70 hover:text-white
              text-4xl transition
            "
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="
              relative w-full max-w-6xl h-[85vh]
              mx-10
              animate-[zoomIn_.25s_ease-out]
            "
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].url}
              alt={images[index].alt}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="
              absolute right-6
              text-white/70 hover:text-white
              text-4xl transition
            "
            aria-label="Next"
          >
            ›
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 text-white/60 text-sm tracking-wide">
            {index + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
