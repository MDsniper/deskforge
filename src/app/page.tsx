import { GpuComparisonTable } from "@/components/gpu-comparison-table";
import { GuidanceSections } from "@/components/guidance-sections";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <div id="top" />
      <SiteHeader />
      <main>
        <Hero />
        <section id="compare" className="scroll-mt-24 border-b border-white/8 bg-[#090d14] py-20 sm:py-24">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10"><GpuComparisonTable /></div>
        </section>
        <section className="bg-[#0a0f17] py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><GuidanceSections /></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
