"use client";

import { useEffect, useState } from "react";
import { ParallaxLayers } from "@/components/ui/parallax-scrolling";

const CYCLE_MS = 5 * 24 * 60 * 60 * 1000;
// Fixed reference point so the countdown is perpetual and consistent for every
// visitor (elapsed time mod the 5-day cycle), rather than resetting per page load.
const CYCLE_EPOCH = new Date("2026-01-01T00:00:00Z").getTime();

function getRemainingMs() {
  const elapsed = (Date.now() - CYCLE_EPOCH) % CYCLE_MS;
  return CYCLE_MS - elapsed;
}

function splitDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function CountdownSection() {
  const [remaining, setRemaining] = useState(CYCLE_MS);

  useEffect(() => {
    setRemaining(getRemainingMs());
    const id = setInterval(() => setRemaining(getRemainingMs()), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = splitDuration(remaining);
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <section className="relative overflow-hidden bg-espresso px-6 py-24 sm:py-32">
      <ParallaxLayers />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="font-subhead text-xs tracking-wide3 uppercase text-gold">
          The Window
        </p>

        <div className="mt-10 flex items-start justify-center gap-4 sm:gap-10">
          {units.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <span className="font-mono text-4xl font-bold tabular-nums text-cream sm:text-6xl">
                {pad(unit.value)}
              </span>
              <span className="mt-3 font-label text-[10px] tracking-wide2 uppercase text-cream/50 sm:text-xs">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl font-body text-base leading-[1.7] text-cream/75">
          Launch Celebration Sale: 22% off the Make Internet Money Hoodie. Five
          days only. After the window closes, price returns to regular.
        </p>
      </div>
    </section>
  );
}
