export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/70 bg-ink text-ink-fg">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xl tracking-tight">DeskForge</p>
          <p className="mt-2 max-w-md text-sm text-ink-fg/70">
            Independent local AI GPU comparison. Not affiliated with NVIDIA, AMD,
            or Amazon. Product links may earn a commission once an Associates tag
            is configured — this build ships with a placeholder tag only.
          </p>
        </div>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-fg/50">
          Specs researched Sep 2026
        </p>
      </div>
    </footer>
  );
}
