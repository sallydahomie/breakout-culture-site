export const spring = { type: "spring" as const, duration: 0.6, bounce: 0.2 };

export function fadeUp(delay = 0) {
  return {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { ...spring, delay } },
  };
}
