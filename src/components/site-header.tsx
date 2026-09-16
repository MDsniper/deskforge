import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-border/60 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-lg tracking-tight text-foreground sm:text-xl">
            DeskForge
          </span>
          <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
            Local AI GPUs
          </span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          <a
            href="#compare"
            className="px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Compare
          </a>
          <a
            href="#guidance"
            className="px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Guidance
          </a>
          <Button
            render={<a href="#compare" />}
            nativeButton={false}
            size="sm"
            className="ml-1 hidden sm:inline-flex"
          >
            Open table
            <ArrowDown data-icon="inline-end" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
