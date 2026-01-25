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

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = () => setOpen(false);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

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

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

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

  if (!images.length) return null;

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px]">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openAt(i)}
            className={`relative overflow-hidden rounded-xl bg-neutral-200 group
              ${i === 0 ? "col-span-2 row-span-2" : ""}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-6 text-white text-4xl"
          >
            ‹
          </button>

          <div
            className="relative w-full max-w-6xl h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].url}
              alt={images[index].alt}
              fill
              unoptimized
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-6 text-white text-4xl"
          >
            ›
          </button>

          <div className="absolute bottom-6 text-white text-sm">
            {index + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
