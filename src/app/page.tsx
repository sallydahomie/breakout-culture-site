import { Hero } from "@/components/Hero";
import { CountdownSection } from "@/components/CountdownSection";
import { DropShowcase } from "@/components/DropShowcase";
import { StatsSection } from "@/components/StatsSection";
import { QuoteSection } from "@/components/QuoteSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CountdownSection />
      <DropShowcase />
      <StatsSection />
      <QuoteSection />
    </>
  );
}
