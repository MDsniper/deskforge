import { CircuitBoard, Code2 } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#090d14]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#top" className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
          <span className="grid size-9 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 transition group-hover:bg-cyan-300/15"><CircuitBoard className="size-5" /></span>
          <span><span className="block font-display text-lg font-semibold tracking-[-0.03em] text-white">DeskForge</span><span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.16em] text-slate-500 sm:block">Local AI hardware</span></span>
        </a>
        <nav aria-label="Primary navigation" className="flex items-center gap-1 text-sm">
          <a href="#compare" className="nav-link">Compare</a>
          <a href="#buyers-guide" className="nav-link hidden sm:inline-flex">Buyer&apos;s guide</a>
          <a href="#methodology" className="nav-link hidden md:inline-flex">Methodology</a>
          <a href="https://github.com/MDsniper/deskforge" target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/5 px-3 py-2 font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            <Code2 className="size-4" /><span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
