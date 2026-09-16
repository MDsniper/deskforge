"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { GPUS, type GpuCard, type Suitability, suitabilityLabel } from "@/data/gpus";
import { amazonSearchUrl } from "@/lib/affiliate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type SortKey =
  | "name"
  | "vramGb"
  | "bandwidthGBs"
  | "tdpWatts"
  | "fp32Tflops"
  | "streetPriceUsd"
  | "dollarsPerGbVram";

type FilterKey = "all" | "nvidia" | "amd" | "24plus";

function SuitabilityBadge({ value }: { value: Suitability }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-mono text-[0.65rem] tracking-wide uppercase",
        value === "excellent" && "border-signal/40 bg-signal/10 text-signal-ink",
        value === "good" && "border-steel/30 bg-steel/10 text-foreground",
        value === "limited" && "border-steel/35 bg-muted text-foreground",
        value === "poor" && "border-destructive/30 bg-destructive/5 text-destructive",
      )}
    >
      {suitabilityLabel(value)}
    </Badge>
  );
}

function SortButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 text-left font-medium transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      <ArrowUpDown className="size-3.5 opacity-60" />
    </button>
  );
}

export function GpuComparisonTable() {
  const [sortKey, setSortKey] = useState<SortKey>("vramGb");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState<FilterKey>("all");

  const rows = useMemo(() => {
    let list: GpuCard[] = [...GPUS];
    if (filter === "nvidia") list = list.filter((g) => g.brand === "NVIDIA");
    if (filter === "amd") list = list.filter((g) => g.brand === "AMD");
    if (filter === "24plus") list = list.filter((g) => g.vramGb >= 24);

    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc"
        ? Number(av) - Number(bv)
        : Number(bv) - Number(av);
    });
    return list;
  }, [filter, sortDir, sortKey]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
            Comparison table
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground md:text-base">
            Sorted for local AI buyers: VRAM, bandwidth, software stack, power, and
            honest training vs inference fit — not gaming FPS.
          </p>
        </div>
        <Tabs
          value={filter}
          onValueChange={(v) => setFilter(v as FilterKey)}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="nvidia">NVIDIA</TabsTrigger>
            <TabsTrigger value="amd">AMD</TabsTrigger>
            <TabsTrigger value="24plus">24 GB+</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/80 bg-card/70 shadow-[0_1px_0_rgba(20,28,36,0.04)] backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="min-w-[11rem]">
                <SortButton
                  label="GPU"
                  active={sortKey === "name"}
                  onClick={() => toggleSort("name")}
                />
              </TableHead>
              <TableHead className="min-w-[7rem]">Ecosystem</TableHead>
              <TableHead className="min-w-[6rem]">
                <SortButton
                  label="VRAM"
                  active={sortKey === "vramGb"}
                  onClick={() => toggleSort("vramGb")}
                />
              </TableHead>
              <TableHead className="min-w-[6rem]">
                <SortButton
                  label="Bandwidth"
                  active={sortKey === "bandwidthGBs"}
                  onClick={() => toggleSort("bandwidthGBs")}
                />
              </TableHead>
              <TableHead className="min-w-[8rem]">Compute</TableHead>
              <TableHead className="min-w-[5rem]">
                <SortButton
                  label="TDP"
                  active={sortKey === "tdpWatts"}
                  onClick={() => toggleSort("tdpWatts")}
                />
              </TableHead>
              <TableHead className="min-w-[9rem]">Cooling / form</TableHead>
              <TableHead className="min-w-[6rem]">Training</TableHead>
              <TableHead className="min-w-[6rem]">Inference</TableHead>
              <TableHead className="min-w-[6rem]">
                <SortButton
                  label="Street $"
                  active={sortKey === "streetPriceUsd"}
                  onClick={() => toggleSort("streetPriceUsd")}
                />
              </TableHead>
              <TableHead className="min-w-[5rem]">
                <SortButton
                  label="$/GB"
                  active={sortKey === "dollarsPerGbVram"}
                  onClick={() => toggleSort("dollarsPerGbVram")}
                />
              </TableHead>
              <TableHead className="min-w-[6rem]">Buy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((gpu) => (
              <TableRow key={gpu.id} className="align-top">
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-foreground">{gpu.name}</span>
                    <span className="font-mono text-[0.7rem] text-muted-foreground">
                      {gpu.brand} · {gpu.architecture}
                    </span>
                    {gpu.highlight ? (
                      <span className="text-[0.7rem] font-medium text-signal">
                        {gpu.highlight}
                      </span>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger className="text-left">
                      <Badge variant="secondary" className="font-mono">
                        {gpu.ecosystem}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      {gpu.ecosystemNotes}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <div className="font-mono text-sm">
                    {gpu.vramGb} GB
                    <div className="text-[0.7rem] text-muted-foreground">
                      {gpu.vramType}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {gpu.bandwidthGBs.toLocaleString()} GB/s
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger className="text-left">
                      <div className="font-mono text-sm">
                        {gpu.fp32Tflops} TFLOPS FP32
                      </div>
                      <div className="text-[0.7rem] text-muted-foreground">
                        {gpu.aiTopsLabel}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      {gpu.aiTopsNote}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="font-mono text-sm">{gpu.tdpWatts} W</TableCell>
                <TableCell className="min-w-[9rem] max-w-[11rem] text-xs leading-snug text-muted-foreground">
                  <span className="block wrap-break-word">{gpu.coolingFormFactor}</span>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      <SuitabilityBadge value={gpu.training} />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      {gpu.trainingNote}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      <SuitabilityBadge value={gpu.inference} />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      {gpu.inferenceNote}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger className="text-left">
                      <div className="font-mono text-sm">
                        ~${gpu.streetPriceUsd.toLocaleString()}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      {gpu.streetPriceNote}. {gpu.valueNote}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  ${gpu.dollarsPerGbVram.toFixed(0)}
                </TableCell>
                <TableCell>
                  <Button
                    render={
                      <a
                        href={amazonSearchUrl(gpu.affiliateQuery)}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                      />
                    }
                    nativeButton={false}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    Check price
                    <ExternalLink data-icon="inline-end" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">
        Affiliate links use a placeholder Associates tag (`YOURTAG-20` unless
        overridden). Swap via `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG`. Prices are
        approximate street estimates, not live inventory.
      </p>
    </div>
  );
}
