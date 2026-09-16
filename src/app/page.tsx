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
      <main className="flex-1">
        <Hero />
        <section
          id="compare"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 md:py-20"
        >
          <GpuComparisonTable />
        </section>
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:pb-28">
          <GuidanceSections />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
