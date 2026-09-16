import Link from "next/link";
import { CircuitBoard, Code2 } from "lucide-react";
import { GPU_SNAPSHOT_DATE } from "@/data/gpus";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#070a0f]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] lg:px-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200"><CircuitBoard className="size-5" /></span>
            <span className="font-display text-xl font-semibold text-white">DeskForge</span>
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-500">Independent editorial comparison for local AI hardware. Not affiliated with NVIDIA, AMD, Intel, or Amazon. Specifications and prices can change; validate the exact product before purchase.</p>
          <p className="mt-4 text-sm leading-6 text-slate-400"><strong className="text-slate-200">Amazon disclosure:</strong> As an Amazon Associate, this site may earn from qualifying purchases when a valid Associates tag is configured.</p>
        </div>
        <div className="md:text-right">
          <a href="https://github.com/MDsniper/deskforge" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-cyan-200"><Code2 className="size-4" /> Source on GitHub</a>
          <div className="mt-4 flex gap-4 text-sm text-slate-500 md:justify-end"><Link className="hover:text-cyan-200" href="/disclosure/">Disclosure</Link><Link className="hover:text-cyan-200" href="/privacy/">Privacy</Link></div>
          <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-600">Data snapshot<br />{GPU_SNAPSHOT_DATE}</p>
        </div>
      </div>
    </footer>
  );
}
