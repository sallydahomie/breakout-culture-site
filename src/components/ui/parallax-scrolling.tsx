"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed background layers, moving at different speeds behind
 * static foreground content — the layered-parallax technique from the
 * 21st.dev "parallax scrolling" component, rebuilt with brand-appropriate
 * SVG motifs instead of hotlinked stock photography.
 */
export function ParallaxLayers() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const layers = [
        { layer: "1", yPercent: 22 },
        { layer: "2", yPercent: -16 },
        { layer: "3", yPercent: 34 },
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.4,
        },
      });

      layers.forEach(({ layer, yPercent }, i) => {
        tl.to(
          rootRef.current!.querySelectorAll(`[data-parallax-layer="${layer}"]`),
          { yPercent, ease: "none" },
          i === 0 ? undefined : "<"
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        data-parallax-layer="1"
        className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="400" cy="400" r="360" stroke="#c9a961" strokeWidth="1" />
        <circle cx="400" cy="400" r="300" stroke="#c9a961" strokeWidth="1" />
      </svg>

      <svg
        data-parallax-layer="2"
        className="absolute inset-x-[-10%] top-[18%] h-40 w-[120%] opacity-[0.08]"
        viewBox="0 0 1200 160"
        fill="none"
        preserveAspectRatio="none"
      >
        <polyline
          points="0,120 120,90 220,110 340,40 460,70 580,20 700,60 820,30 940,80 1060,50 1200,90"
          stroke="#c9a961"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <svg
        data-parallax-layer="3"
        className="absolute inset-0 h-full w-full opacity-[0.09]"
        viewBox="0 0 800 800"
        fill="none"
      >
        {[
          [80, 120], [720, 90], [140, 640], [660, 600], [400, 60], [60, 400], [740, 420],
        ].map(([cx, cy], i) => (
          <path
            key={i}
            d={`M${cx - 8} ${cy} H${cx + 8} M${cx} ${cy - 8} V${cy + 8}`}
            stroke="#c9a961"
            strokeWidth="1.5"
          />
        ))}
      </svg>
    </div>
  );
}
