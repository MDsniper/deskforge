"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  ExternalLink,
  FilterX,
  Search,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";
import {
  GPUS,
  pricePerGb,
  type Ecosystem,
  type GpuCard,
  type Segment,
  type Suitability,
} from "@/data/gpus";
import { amazonSearchUrl } from "@/lib/affiliate";

type SortKey = "recommended" | "vram" | "bandwidth" | "power" | "price" | "value";
type Workload = "inference" | "training" | "image";

const suitabilityScore: Record<Suitability, number> = {
  Excellent: 4,
  Strong: 3,
  Good: 2,
  Limited: 1,
  Poor: 0,
};

const suitabilityTone: Record<Suitability, string> = {
  Excellent: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Strong: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",
  Good: "border-sky-400/30 bg-sky-400/10 text-sky-100",
  Limited: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  Poor: "border-rose-400/30 bg-rose-400/10 text-rose-100",
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function workloadScore(gpu: GpuCard, workload: Workload) {
  if (workload === "training") return suitabilityScore[gpu.training] * 100 + gpu.vramGb;
  if (workload === "image") {
    const ecosystemBonus = gpu.ecosystem === "CUDA" ? 80 : gpu.ecosystem === "ROCm" ? 40 : 10;
    return suitabilityScore[gpu.inference] * 100 + ecosystemBonus + gpu.vramGb + gpu.bandwidthGBs / 100;
  }
  return suitabilityScore[gpu.inference] * 100 + gpu.vramGb + gpu.bandwidthGBs / 100;
}

function SuitabilityPill({ value }: { value: Suitability }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${suitabilityTone[value]}`}>
      {value}
    </span>
  );
}

function PurchaseLinks({ gpu }: { gpu: GpuCard }) {
  return (
    <div className="flex flex-wrap gap-2">
      {gpu.affiliateQuery ? (
        <a
          href={amazonSearchUrl(gpu.affiliateQuery)}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#ffb84d] px-3 py-2 text-xs font-bold text-[#1b1308] transition hover:bg-[#ffc66f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb84d] active:scale-[0.97]"
          aria-label={`Check Amazon listings for ${gpu.name}`}
        >
          <ShoppingCart className="size-3.5" aria-hidden="true" />
          Check Amazon
        </a>
      ) : null}
      <a
        href={gpu.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-[0.97]"
      >
        Specs
        <ExternalLink className="size-3" aria-hidden="true" />
      </a>
    </div>
  );
}

export function GpuComparisonTable() {
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState<Segment | "All">("All");
  const [ecosystem, setEcosystem] = useState<Ecosystem | "All">("All");
  const [minVram, setMinVram] = useState(12);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortKey, setSortKey] = useState<SortKey>("recommended");
  const [workload, setWorkload] = useState<Workload>("inference");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return GPUS.filter((gpu) => {
      const matchesSearch = !query || [gpu.name, gpu.brand, gpu.architecture, gpu.ecosystem, gpu.modelFit]
        .join(" ")
        .toLowerCase()
        .includes(query);
      return (
        matchesSearch &&
        (segment === "All" || gpu.segment === segment) &&
        (ecosystem === "All" || gpu.ecosystem === ecosystem) &&
        gpu.vramGb >= minVram &&
        gpu.priceUsd <= maxPrice
      );
    }).sort((a, b) => {
      if (sortKey === "recommended") return workloadScore(b, workload) - workloadScore(a, workload);
      if (sortKey === "vram") return b.vramGb - a.vramGb;
      if (sortKey === "bandwidth") return b.bandwidthGBs - a.bandwidthGBs;
      if (sortKey === "power") return a.powerWatts - b.powerWatts;
      if (sortKey === "price") return a.priceUsd - b.priceUsd;
      return pricePerGb(a) - pricePerGb(b);
    });
  }, [ecosystem, maxPrice, minVram, search, segment, sortKey, workload]);

  function resetFilters() {
    setSearch("");
    setSegment("All");
    setEcosystem("All");
    setMinVram(12);
    setMaxPrice(50000);
    setSortKey("recommended");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Decision matrix</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            Find the card that fits the workload.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Capacity decides what can run. Bandwidth influences how fast it runs. The software stack decides whether it runs without a fight.
          </p>
        </div>
        <div className="inline-flex w-fit rounded-xl border border-white/10 bg-slate-950/60 p-1" aria-label="Primary workload">
          {(["inference", "training", "image"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setWorkload(option)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold capitalize transition sm:text-sm ${workload === option ? "bg-cyan-300 text-slate-950" : "text-slate-400 hover:text-white"}`}
            >
              {option === "image" ? "Image generation" : option}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0d141f]/90 p-4 shadow-2xl shadow-black/20 sm:p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.4fr_0.75fr_0.75fr_1fr_1fr]">
          <label className="space-y-2">
            <span className="filter-label"><Search className="size-3.5" /> Search</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="RTX 5090, Blackwell, ROCm…"
              className="control w-full"
            />
          </label>
          <label className="space-y-2">
            <span className="filter-label">Segment</span>
            <select value={segment} onChange={(event) => setSegment(event.target.value as Segment | "All")} className="control w-full">
              <option>All</option>
              <option>Consumer</option>
              <option>Workstation</option>
              <option>Data center</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="filter-label">Ecosystem</span>
            <select value={ecosystem} onChange={(event) => setEcosystem(event.target.value as Ecosystem | "All")} className="control w-full">
              <option>All</option>
              <option>CUDA</option>
              <option>ROCm</option>
              <option>oneAPI</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="filter-label"><SlidersHorizontal className="size-3.5" /> Minimum VRAM <strong>{minVram} GB</strong></span>
            <input type="range" min="8" max="180" step="4" value={minVram} onChange={(event) => setMinVram(Number(event.target.value))} className="range w-full" />
          </label>
          <label className="space-y-2">
            <span className="filter-label"><SlidersHorizontal className="size-3.5" /> Maximum price <strong>{formatPrice(maxPrice)}</strong></span>
            <input type="range" min="500" max="50000" step="500" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="range w-full" />
          </label>
        </div>
        <div className="mt-5 flex flex-col gap-3 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-slate-400" aria-live="polite">
            <span className="text-cyan-200">{filtered.length}</span> of {GPUS.length} GPUs match
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-slate-400">
              <ArrowUpDown className="size-3.5" /> Sort
              <select value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)} className="control py-1.5 text-xs">
                <option value="recommended">Recommended</option>
                <option value="vram">Most VRAM</option>
                <option value="bandwidth">Most bandwidth</option>
                <option value="power">Lowest power</option>
                <option value="price">Lowest price</option>
                <option value="value">Lowest $/GB</option>
              </select>
            </label>
            <button type="button" onClick={resetFilters} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white">
              <FilterX className="size-3.5" /> Reset
            </button>
          </div>
        </div>
      </div>

      {filtered.length ? (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-[#0b111a] shadow-2xl shadow-black/20 lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1320px] border-collapse text-left">
                <thead className="bg-[#121b28] font-mono text-[0.66rem] uppercase tracking-[0.13em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">GPU</th>
                    <th className="px-4 py-4">VRAM / bandwidth</th>
                    <th className="px-4 py-4">Power / integration</th>
                    <th className="px-4 py-4">Software / compute</th>
                    <th className="px-4 py-4">Training</th>
                    <th className="px-4 py-4">Inference</th>
                    <th className="px-4 py-4">Price / value</th>
                    <th className="px-4 py-4">Links</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/7">
                  {filtered.map((gpu) => (
                    <tr key={gpu.id} className="group align-top transition hover:bg-cyan-300/[0.035]">
                      <td className="px-5 py-5">
                        <div className="min-w-48">
                          <div className="flex flex-wrap gap-1.5">
                            <span className="data-tag">{gpu.segment}</span>
                            <span className="data-tag">{gpu.architecture}</span>
                          </div>
                          <p className="mt-3 font-display text-base font-semibold text-white">{gpu.name}</p>
                          <p className="mt-1 text-xs text-slate-500">{gpu.brand}</p>
                          {gpu.highlight ? <p className="mt-3 text-xs font-semibold text-cyan-200">{gpu.highlight}</p> : null}
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <p className="font-mono text-base font-semibold text-white">{gpu.vramGb} GB</p>
                        <p className="mt-1 text-xs text-slate-400">{gpu.vramType}</p>
                        <p className="mt-4 font-mono text-sm text-cyan-100">{gpu.bandwidthGBs.toLocaleString()} GB/s</p>
                        <p className="mt-2 max-w-44 text-xs leading-5 text-slate-500">{gpu.modelFit}</p>
                      </td>
                      <td className="px-4 py-5">
                        <p className="font-mono text-base font-semibold text-white">{gpu.powerWatts} W</p>
                        <p className="mt-2 max-w-44 text-xs leading-5 text-slate-400">{gpu.formFactor}</p>
                      </td>
                      <td className="px-4 py-5">
                        <span className="ecosystem-pill">{gpu.ecosystem}</span>
                        <p className="mt-3 max-w-48 text-xs leading-5 text-slate-400">{gpu.ecosystemNote}</p>
                        <p className="mt-3 font-mono text-[0.68rem] text-cyan-100">{gpu.aiMetric}</p>
                      </td>
                      <td className="px-4 py-5">
                        <SuitabilityPill value={gpu.training} />
                        <p className="mt-3 max-w-44 text-xs leading-5 text-slate-400">{gpu.trainingNote}</p>
                      </td>
                      <td className="px-4 py-5">
                        <SuitabilityPill value={gpu.inference} />
                        <p className="mt-3 max-w-44 text-xs leading-5 text-slate-400">{gpu.inferenceNote}</p>
                      </td>
                      <td className="px-4 py-5">
                        <p className="font-mono text-sm font-semibold text-white">{gpu.priceLabel}</p>
                        <p className="mt-2 text-xs text-cyan-100">~{formatPrice(pricePerGb(gpu))}/GB</p>
                        <p className="mt-2 max-w-44 text-xs leading-5 text-slate-500">{gpu.priceNote}</p>
                      </td>
                      <td className="px-4 py-5"><PurchaseLinks gpu={gpu} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 lg:hidden">
            {filtered.map((gpu) => (
              <article key={gpu.id} className="rounded-2xl border border-white/10 bg-[#0d141f] p-5 shadow-xl shadow-black/20">
                <div className="flex flex-wrap gap-1.5"><span className="data-tag">{gpu.segment}</span><span className="data-tag">{gpu.architecture}</span><span className="data-tag">{gpu.ecosystem}</span></div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{gpu.name}</h3>
                {gpu.highlight ? <p className="mt-1 text-xs font-semibold text-cyan-200">{gpu.highlight}</p> : null}
                <div className="mt-5 grid grid-cols-3 gap-2">
                  <div className="metric-box"><span>VRAM</span><strong>{gpu.vramGb} GB</strong></div>
                  <div className="metric-box"><span>Bandwidth</span><strong>{gpu.bandwidthGBs.toLocaleString()}</strong></div>
                  <div className="metric-box"><span>Power</span><strong>{gpu.powerWatts} W</strong></div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div><p className="card-label">Training</p><SuitabilityPill value={gpu.training} /><p className="mt-2 text-sm leading-6 text-slate-400">{gpu.trainingNote}</p></div>
                  <div><p className="card-label">Inference</p><SuitabilityPill value={gpu.inference} /><p className="mt-2 text-sm leading-6 text-slate-400">{gpu.inferenceNote}</p></div>
                </div>
                <details className="mt-5 rounded-xl border border-white/8 bg-black/15 p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-200">Integration details</summary>
                  <div className="mt-3 space-y-3 text-sm leading-6 text-slate-400"><p><strong className="text-slate-200">Fit:</strong> {gpu.modelFit}</p><p><strong className="text-slate-200">Software:</strong> {gpu.ecosystemNote}</p><p><strong className="text-slate-200">Chassis:</strong> {gpu.formFactor}</p><p><strong className="text-slate-200">Compute:</strong> {gpu.aiMetric}. {gpu.aiMetricNote}</p></div>
                </details>
                <div className="mt-5 flex flex-col gap-4 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div><p className="font-mono text-sm font-semibold text-white">{gpu.priceLabel}</p><p className="mt-1 text-xs text-slate-500">~{formatPrice(pricePerGb(gpu))}/GB</p></div>
                  <PurchaseLinks gpu={gpu} />
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold text-white">No GPUs match this configuration.</p>
          <p className="mt-2 text-sm text-slate-400">Reduce the VRAM requirement, increase the budget, or clear a platform filter.</p>
          <button type="button" onClick={resetFilters} className="mt-5 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950">Reset filters</button>
        </div>
      )}

      <p className="text-xs leading-5 text-slate-500">
        Prices are editorial market snapshots, not live Amazon prices. Manufacturer AI metrics use different precision and sparsity conventions and are not directly comparable. Amazon availability varies by card, seller, and region.
      </p>
    </div>
  );
}
