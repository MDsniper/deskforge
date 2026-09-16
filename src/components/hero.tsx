import { ArrowDown, Cpu, Database, Gauge, Server } from "lucide-react";
import { GPUS } from "@/data/gpus";

export function Hero() {
  const consumerCount = GPUS.filter((gpu) => gpu.segment === "Consumer").length;
  const maxVram = Math.max(...GPUS.map((gpu) => gpu.vramGb));
  const ecosystems = new Set(GPUS.map((gpu) => gpu.ecosystem)).size;

  return (
    <section className="relative isolate overflow-hidden border-b border-white/8">
      <div className="hero-grid absolute inset-0 -z-20" aria-hidden="true" />
      <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:px-10 lg:pb-24 lg:pt-32">
        <div>
          <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cyan-100">
            <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
            2026 hardware intelligence
          </div>
          <h1 className="animate-rise delay-1 mt-7 max-w-4xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[5.35rem]">
            Stop buying GPUs by gaming benchmarks.
          </h1>
          <p className="animate-rise delay-2 mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            DeskForge ranks consumer, workstation, and data-center cards by the constraints that govern local AI: <strong className="font-semibold text-white">VRAM, bandwidth, software support, power, and model fit.</strong>
          </p>
          <div className="animate-rise delay-3 mt-9 flex flex-wrap gap-3">
            <a href="#compare" className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_36px_rgba(103,232,249,0.2)] transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100 active:scale-[0.97]">
              Compare GPUs <ArrowDown className="size-4" />
            </a>
            <a href="#buyers-guide" className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-300/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-[0.97]">
              Read the buying framework
            </a>
          </div>
        </div>

        <div className="animate-fade-in relative mx-auto w-full max-w-xl lg:mx-0">
          <div className="absolute -inset-10 -z-10 rounded-full bg-cyan-300/5 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b121d]/90 p-5 shadow-[0_40px_100px_rgba(0,0,0,0.45)] sm:p-7">
            <div className="flex items-center justify-between border-b border-white/8 pb-5">
              <div><p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-cyan-200">Workload profile</p><p className="mt-1 font-display text-lg font-semibold text-white">Local model workstation</p></div>
              <div className="flex gap-1.5"><span className="size-2 rounded-full bg-rose-400/70" /><span className="size-2 rounded-full bg-amber-300/70" /><span className="size-2 rounded-full bg-emerald-300/70" /></div>
            </div>
            <div className="relative my-8 flex min-h-64 items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.13),transparent_55%),linear-gradient(135deg,#0a1018,#101a28)]">
              <div className="circuit-lines absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="gpu-silhouette relative z-10 flex h-36 w-64 items-center justify-center rounded-2xl border border-cyan-200/20 bg-[#151d28] shadow-[0_24px_70px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="absolute left-5 size-24 rounded-full border-[9px] border-[#242f3d] bg-[radial-gradient(circle,#111823_0_22%,#263343_23%_31%,#101722_32%)] shadow-[0_0_30px_rgba(34,211,238,0.08)]" />
                <div className="absolute right-5 size-24 rounded-full border-[9px] border-[#242f3d] bg-[radial-gradient(circle,#111823_0_22%,#263343_23%_31%,#101722_32%)]" />
                <div className="absolute left-1/2 top-1/2 h-2 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/50 blur-[1px]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <HeroMetric icon={Cpu} value={String(GPUS.length)} label="GPUs" />
              <HeroMetric icon={Database} value={`${maxVram} GB`} label="Max VRAM" />
              <HeroMetric icon={Gauge} value={String(ecosystems)} label="Stacks" />
              <HeroMetric icon={Server} value={String(consumerCount)} label="Consumer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMetric({ icon: Icon, value, label }: { icon: typeof Cpu; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
      <Icon className="size-4 text-cyan-200" aria-hidden="true" />
      <p className="mt-4 font-mono text-sm font-semibold text-white">{value}</p>
      <p className="mt-1 text-[0.68rem] uppercase tracking-[0.1em] text-slate-500">{label}</p>
    </div>
  );
}
