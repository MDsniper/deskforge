import { AlertTriangle, Boxes, BrainCircuit, Gauge, HardDrive, Layers3, ShieldCheck, Zap } from "lucide-react";

const principles = [
  { icon: HardDrive, title: "VRAM decides model fit", body: "Model weights, KV cache, context, runtime overhead, and image-generation tensors must fit. Offload works, but latency rises quickly." },
  { icon: Gauge, title: "Bandwidth shapes responsiveness", body: "Autoregressive token generation is frequently memory-bound. Once the model fits, bandwidth often matters more than peak gaming compute." },
  { icon: BrainCircuit, title: "Software is a purchase constraint", body: "CUDA remains the broadest path. ROCm and oneAPI can be effective, but exact GPU, OS, driver, framework, and kernel support must align." },
  { icon: Zap, title: "Power changes the build", body: "A 575 W desktop GPU and a 1,000 W server module are not interchangeable. Include PSU quality, connectors, airflow, noise, and operating cost." },
];

export function GuidanceSections() {
  return (
    <div id="buyers-guide" className="space-y-24 scroll-mt-24">
      <section>
        <div className="max-w-2xl"><p className="eyebrow">The buying framework</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">Four constraints beat one benchmark.</h2><p className="mt-4 leading-7 text-slate-400">Local AI hardware decisions fail when gaming FPS or a vendor TOPS number becomes the entire evaluation. Start with capacity, validate software, then optimize throughput and power.</p></div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ icon: Icon, title, body }) => <article key={title} className="bg-[#0d141f] p-6"><Icon className="size-5 text-cyan-200" /><h3 className="mt-8 font-display text-lg font-semibold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{body}</p></article>)}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-[#0d141f] p-7 sm:p-8">
          <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200"><Layers3 className="size-5" /></span><div><p className="eyebrow">Inference</p><h3 className="mt-1 font-display text-2xl font-semibold text-white">Run trained models</h3></div></div>
          <p className="mt-6 leading-7 text-slate-400">Inference loads model weights and generates tokens, embeddings, images, audio, or video. The first question is whether the model, context cache, and runtime fit in VRAM. Quantization reduces memory, usually at some quality or compatibility cost.</p>
          <div className="mt-7 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5"><p className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-200">Practical capacity bands</p><p className="mt-3 text-sm leading-6 text-slate-300">12–16 GB targets compact models. 24–32 GB opens mid-size quantized models and image workflows. 48–96 GB supports larger models, contexts, and concurrency. HBM accelerators address enterprise throughput.</p></div>
        </article>
        <article className="rounded-2xl border border-white/10 bg-[#0d141f] p-7 sm:p-8">
          <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-amber-300/10 text-amber-200"><Boxes className="size-5" /></span><div><p className="eyebrow text-amber-200">Training</p><h3 className="mt-1 font-display text-2xl font-semibold text-white">Update model weights</h3></div></div>
          <p className="mt-6 leading-7 text-slate-400">Training requires space for weights, gradients, optimizer state, activations, and temporary tensors. A GPU that runs a model may still be unable to train it. Consumer cards are best viewed as experimentation and parameter-efficient fine-tuning platforms.</p>
          <div className="mt-7 rounded-xl border border-amber-300/15 bg-amber-300/[0.04] p-5"><p className="font-mono text-xs uppercase tracking-[0.14em] text-amber-200">Use cloud or data center when</p><p className="mt-3 text-sm leading-6 text-slate-300">The workload needs full-parameter training, multiple accelerators with high-speed fabric, enterprise uptime, or more VRAM than a workstation can provide economically.</p></div>
        </article>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(14,20,31,0.96)_42%,rgba(251,191,36,0.05))] p-7 sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-2xl"><p className="eyebrow">Shortlist</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white">Start here, then validate your exact stack.</h2></div><p className="max-w-md text-sm leading-6 text-slate-400">These are decision anchors, not universal winners. Model, quantization, context, operating system, noise tolerance, and budget can change the outcome.</p></div>
        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <QuickPick label="Used CUDA capacity" gpu="RTX 3090 24 GB" note="Strong VRAM value if condition and thermals are verified." />
          <QuickPick label="Efficient new CUDA" gpu="RTX 5060 Ti 16 GB" note="Practical entry point for smaller models and image workflows." />
          <QuickPick label="32 GB workstation value" gpu="Radeon AI PRO R9700" note="Compelling capacity after the intended ROCm stack is proven." />
          <QuickPick label="Professional CUDA" gpu="RTX PRO 5000 48 GB" note="ECC, mature software, and meaningful single-card headroom." />
        </div>
      </section>

      <section id="methodology" className="scroll-mt-24 border-t border-white/10 pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="eyebrow">Methodology</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white">Transparent limits.</h2></div><div className="space-y-5 text-sm leading-7 text-slate-400"><p><ShieldCheck className="mr-2 inline size-4 text-cyan-200" />Core memory, bandwidth, board-power, architecture, and form-factor claims use manufacturer materials. Market prices are dated editorial observations, not automated retailer feeds.</p><p><AlertTriangle className="mr-2 inline size-4 text-amber-200" />Vendor AI metrics can use different precisions, sparsity assumptions, and accumulation modes. They are included for context and must not be treated as normalized cross-vendor benchmarks.</p><p>Amazon buttons are search links rather than fixed product pages because board partners, stock, and sellers change. The site does not display live Amazon price or availability data.</p></div></div>
      </section>
    </div>
  );
}

function QuickPick({ label, gpu, note }: { label: string; gpu: string; note: string }) {
  return <article className="rounded-xl border border-white/8 bg-black/20 p-5"><p className="font-mono text-[0.64rem] uppercase tracking-[0.15em] text-cyan-200">{label}</p><h3 className="mt-5 font-display text-lg font-semibold text-white">{gpu}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{note}</p></article>;
}
