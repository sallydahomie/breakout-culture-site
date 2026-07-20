"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const COOLDOWN_MS = 120;
const SWIPE_THRESHOLD = 24;

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

export function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const isEngaged = useCallback(() => {
    const el = containerRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const viewportMid = window.innerHeight / 2;
    return rect.top < viewportMid && rect.bottom > viewportMid;
  }, []);

  // Returns true if the step was accepted (used to decide whether to
  // preventDefault and keep the page pinned, or let native scroll continue).
  const tryStep = useCallback(
    (direction: 1 | -1) => {
      if (lockedRef.current) return false;
      const atStart = indexRef.current === 0;
      const atEnd = indexRef.current === images.length - 1;
      if ((direction === 1 && atEnd) || (direction === -1 && atStart)) {
        return false;
      }
      lockedRef.current = true;
      setIndex((current) => current + direction);
      window.setTimeout(() => {
        lockedRef.current = false;
      }, COOLDOWN_MS);
      return true;
    },
    [images.length]
  );

  useEffect(() => {
    if (reduceMotion || images.length <= 1) return;

    function handleWheel(e: WheelEvent) {
      if (!isEngaged()) return;
      const direction: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      if (tryStep(direction)) {
        e.preventDefault();
      }
    }

    function handleTouchStart(e: TouchEvent) {
      if (!isEngaged()) return;
      touchStartY.current = e.touches[0].clientY;
    }

    function handleTouchMove(e: TouchEvent) {
      if (!isEngaged() || touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
      const direction: 1 | -1 = deltaY > 0 ? 1 : -1;
      if (tryStep(direction)) {
        e.preventDefault();
        touchStartY.current = e.touches[0].clientY;
      }
    }

    function handleTouchEnd() {
      touchStartY.current = null;
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (!isEngaged()) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (tryStep(1)) e.preventDefault();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (tryStep(-1)) e.preventDefault();
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEngaged, tryStep, reduceMotion, images.length]);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${productName} images`}
      className="relative"
    >
      <div className="relative aspect-square overflow-hidden bg-espresso">
        {images.map((src, i) => (
          <div
            key={src}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-opacity duration-100 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={`${productName}, view ${i + 1} of ${images.length}`}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-contain p-8 sm:p-12"
              priority={i === 0}
            />
          </div>
        ))}

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => tryStep(-1)}
              disabled={index === 0}
              className="focus-gold absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-gold/40 bg-espresso/70 p-2 text-cream transition-colors duration-200 hover:border-gold hover:text-gold disabled:opacity-0"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => tryStep(1)}
              disabled={index === images.length - 1}
              className="focus-gold absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-gold/40 bg-espresso/70 p-2 text-cream transition-colors duration-200 hover:border-gold hover:text-gold disabled:opacity-0"
            >
              <ArrowIcon direction="right" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-gold" : "w-1.5 bg-cream/25 hover:bg-cream/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
