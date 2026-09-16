import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function GuidanceSections() {
  return (
    <div id="guidance" className="flex flex-col gap-16 md:gap-20">
      <section
        id="training-vs-inference"
        className="scroll-mt-24 grid gap-8 md:grid-cols-2 md:gap-12"
      >
        <div className="animate-rise">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-signal">
            Local AI basics
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground md:text-4xl">
            Training is not inference
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Most home builds buy a GPU to{" "}
            <span className="text-foreground">run</span> models (inference). Far
            fewer need to{" "}
            <span className="text-foreground">train or fine-tune</span> from
            scratch. Mixing those jobs up is how people overspend on TOPS
            marketing and underbuy VRAM.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border/80 bg-card/60 p-5 backdrop-blur-sm animate-rise delay-1">
            <h3 className="font-medium text-foreground">AI Inferencing</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Load a trained model and generate tokens, embeddings, or images.
              Bottlenecks: VRAM capacity (does the model fit?), memory bandwidth
              (tokens/sec), and a software stack that actually runs on your OS.
            </p>
          </div>
          <div className="rounded-xl border border-border/80 bg-card/60 p-5 backdrop-blur-sm animate-rise delay-2">
            <h3 className="font-medium text-foreground">AI Training</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Update weights — full training or LoRA/QLoRA fine-tunes. Needs more
              VRAM headroom for optimizer states, prefers mature CUDA tooling,
              and often still loses to rented multi-GPU cloud for large jobs.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <div>
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            What to optimize for
          </h2>
          <ul className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <li>
              <span className="font-medium text-foreground">VRAM first.</span>{" "}
              24 GB is the practical floor for comfortable mid-size LLMs; 16 GB
              is fine for 7B–14B; 32 GB unlocks longer context and larger quants.
            </li>
            <li>
              <span className="font-medium text-foreground">
                Bandwidth second.
              </span>{" "}
              Token generation is often memory-bound. Peak sparse AI TOPS look
              impressive and rarely match real llama.cpp / vLLM throughput.
            </li>
            <li>
              <span className="font-medium text-foreground">Ecosystem third.</span>{" "}
              CUDA remains the path of least resistance. ROCm on RDNA 3/4 is
              usable in 2026 for inference, with more friction for niche training
              stacks.
            </li>
            <li>
              <span className="font-medium text-foreground">Power & cooling.</span>{" "}
              A 575 W card needs case airflow and a serious PSU. Factor wall
              power into total cost of ownership.
            </li>
          </ul>
        </div>
        <Alert className="border-signal/25 bg-signal/5">
          <Info />
          <AlertTitle>Price volatility</AlertTitle>
          <AlertDescription>
            Street prices in the table are rounded US estimates as of September
            2026. Memory shortages and scalping can swing listings hundreds of
            dollars week to week — always verify the live Amazon result before
            buying.
          </AlertDescription>
        </Alert>
      </section>

      <section className="rounded-2xl border border-border/80 bg-[linear-gradient(135deg,rgba(40,90,120,0.1),rgba(32,120,130,0.08))] p-6 sm:p-8">
        <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
          Quick picks
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              Best used value
            </p>
            <p className="mt-1 font-medium">RTX 3090 24 GB</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Same VRAM class as a 4090 for less money if you find a clean used
              unit.
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              Best AMD path
            </p>
            <p className="mt-1 font-medium">RX 7900 XTX 24 GB</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Strong $/GB with ROCm caveats — verify your Linux/Windows stack
              first.
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              Peak single card
            </p>
            <p className="mt-1 font-medium">RTX 5090 32 GB</p>
            <p className="mt-1 text-sm text-muted-foreground">
              When you need the VRAM ceiling and bandwidth — and can stomach the
              street premium.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
