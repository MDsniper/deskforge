import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(32,120,130,0.16),transparent_55%),radial-gradient(900px_500px_at_10%_20%,rgba(40,70,110,0.12),transparent_50%),linear-gradient(180deg,#e8eef2_0%,#e4eaef_45%,#dfe6ec_100%)]"
      />
      <div
        aria-hidden
        className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end gap-10 px-4 pb-16 pt-20 sm:px-6 md:min-h-[72vh] md:pb-20 md:pt-24">
        <div className="max-w-3xl animate-rise">
          <p className="font-display text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            DeskForge
          </p>
          <h1 className="mt-5 max-w-2xl text-balance text-xl font-medium leading-snug text-ink-soft sm:text-2xl md:text-[1.65rem]">
            Compare video cards for local AI — by VRAM, power, software stack, and
            real training vs inference fit.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Built for people running models at home: CUDA vs ROCm, watts on the
            wall, cooling reality, and approximate street prices with
            Associates-ready links.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              render={<a href="#compare" />}
              nativeButton={false}
              size="lg"
              className="min-w-40"
            >
              Jump to comparison
              <ArrowDown data-icon="inline-end" />
            </Button>
            <Button
              render={<a href="#training-vs-inference" />}
              nativeButton={false}
              variant="outline"
              size="lg"
            >
              Training vs inference
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-foreground/10 pt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground animate-fade-in">
          <span>8 cards tracked</span>
          <span>Consumer / prosumer</span>
          <span>Sep 2026 estimates</span>
        </div>
      </div>
    </section>
  );
}
