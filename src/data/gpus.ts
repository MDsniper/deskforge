export type Suitability = "excellent" | "good" | "limited" | "poor";

export type GpuCard = {
  id: string;
  brand: "NVIDIA" | "AMD";
  name: string;
  architecture: string;
  ecosystem: string;
  ecosystemNotes: string;
  tdpWatts: number;
  coolingFormFactor: string;
  vramGb: number;
  vramType: string;
  bandwidthGBs: number;
  fp32Tflops: number;
  aiTopsLabel: string;
  aiTopsNote: string;
  streetPriceUsd: number;
  streetPriceNote: string;
  msrpUsd: number | null;
  dollarsPerGbVram: number;
  training: Suitability;
  inference: Suitability;
  trainingNote: string;
  inferenceNote: string;
  valueNote: string;
  affiliateQuery: string;
  highlight?: string;
};

/**
 * Approximate US street prices compiled Sep 2026 from public listings and
 * local-AI buyer guides. Specs from manufacturer materials where available.
 * Prices move fast — treat as directional, not a live quote.
 */
export const GPUS: GpuCard[] = [
  {
    id: "rtx-5090",
    brand: "NVIDIA",
    name: "GeForce RTX 5090",
    architecture: "Blackwell",
    ecosystem: "CUDA",
    ecosystemNotes:
      "Full CUDA / TensorRT / bitsandbytes stack. Broadest local AI tooling support.",
    tdpWatts: 575,
    coolingFormFactor: "3–4 slot triple-fan · needs 1000W+ PSU",
    vramGb: 32,
    vramType: "GDDR7",
    bandwidthGBs: 1792,
    fp32Tflops: 104.8,
    aiTopsLabel: "~3,352 AI TOPS",
    aiTopsNote:
      "Sparse FP4 peak from NVIDIA marketing. Useful dense FP16/BF16 is far lower; bandwidth + VRAM matter more for LLMs.",
    streetPriceUsd: 2800,
    streetPriceNote: "MSRP $1,999; US street often $2,500–$4,000+",
    msrpUsd: 1999,
    dollarsPerGbVram: 87.5,
    training: "good",
    inference: "excellent",
    trainingNote:
      "Fine-tunes mid-size models well; full training of 70B+ still needs multi-GPU or cloud.",
    inferenceNote:
      "Best single consumer card for long-context and 30B–70B Q4 with headroom.",
    valueNote: "Peak speed and 32 GB — pay a steep premium vs used 24 GB cards.",
    affiliateQuery: "NVIDIA GeForce RTX 5090 32GB",
    highlight: "Top single-card inference",
  },
  {
    id: "rtx-5080",
    brand: "NVIDIA",
    name: "GeForce RTX 5080",
    architecture: "Blackwell",
    ecosystem: "CUDA",
    ecosystemNotes: "Same mature CUDA stack as the rest of the 50-series.",
    tdpWatts: 360,
    coolingFormFactor: "2.5–3.5 slot dual/triple-fan · ~850W PSU",
    vramGb: 16,
    vramType: "GDDR7",
    bandwidthGBs: 960,
    fp32Tflops: 56.3,
    aiTopsLabel: "~1,801 AI TOPS",
    aiTopsNote: "Sparse marketing TOPS. 16 GB is the practical ceiling for model size.",
    streetPriceUsd: 1200,
    streetPriceNote: "MSRP $999; partner cards often $1,100–$1,400",
    msrpUsd: 999,
    dollarsPerGbVram: 75,
    training: "limited",
    inference: "good",
    trainingNote: "Comfortable for LoRA on ≤13B; VRAM caps serious training.",
    inferenceNote: "Fast for 7B–14B; larger models need offload or quantization tricks.",
    valueNote: "Great gaming+AI hybrid if you stay under ~14B parameters.",
    affiliateQuery: "NVIDIA GeForce RTX 5080 16GB",
  },
  {
    id: "rtx-5070-ti",
    brand: "NVIDIA",
    name: "GeForce RTX 5070 Ti",
    architecture: "Blackwell",
    ecosystem: "CUDA",
    ecosystemNotes: "CUDA everywhere; strong entry into the Blackwell generation.",
    tdpWatts: 300,
    coolingFormFactor: "2–3 slot · ~750W PSU",
    vramGb: 16,
    vramType: "GDDR7",
    bandwidthGBs: 896,
    fp32Tflops: 44.4,
    aiTopsLabel: "~1,406 AI TOPS",
    aiTopsNote: "Estimate from Tensor scale vs 5080; confirm against vendor sheets.",
    streetPriceUsd: 850,
    streetPriceNote: "MSRP $749; street roughly $800–$1,000",
    msrpUsd: 749,
    dollarsPerGbVram: 53.1,
    training: "limited",
    inference: "good",
    trainingNote: "Fine-tuning small models only; batch sizes stay small.",
    inferenceNote: "Solid daily driver for 7B–13B chat and coding models.",
    valueNote: "Best new-NVIDIA price for 16 GB if 5080 feels wasteful.",
    affiliateQuery: "NVIDIA GeForce RTX 5070 Ti 16GB",
  },
  {
    id: "rtx-4090",
    brand: "NVIDIA",
    name: "GeForce RTX 4090",
    architecture: "Ada Lovelace",
    ecosystem: "CUDA",
    ecosystemNotes: "Battle-tested CUDA ecosystem; still the community default for local AI.",
    tdpWatts: 450,
    coolingFormFactor: "3–4 slot · ~850–1000W PSU",
    vramGb: 24,
    vramType: "GDDR6X",
    bandwidthGBs: 1008,
    fp32Tflops: 82.6,
    aiTopsLabel: "1,321 AI TOPS",
    aiTopsNote: "Official sparse FP8 Tensor figure from NVIDIA Ada materials.",
    streetPriceUsd: 2400,
    streetPriceNote: "Discontinued new; used/refurb often $2,150–$3,600",
    msrpUsd: 1599,
    dollarsPerGbVram: 100,
    training: "good",
    inference: "excellent",
    trainingNote: "Strong fine-tune platform for 7B–34B with LoRA/QLoRA.",
    inferenceNote: "24 GB fits most quantized mid-size models without drama.",
    valueNote: "Buy used only if well below new-flagship pricing.",
    affiliateQuery: "NVIDIA GeForce RTX 4090 24GB",
    highlight: "Proven 24 GB workhorse",
  },
  {
    id: "rtx-4070-ti-super",
    brand: "NVIDIA",
    name: "GeForce RTX 4070 Ti SUPER",
    architecture: "Ada Lovelace",
    ecosystem: "CUDA",
    ecosystemNotes: "Full CUDA; quieter power envelope than flagship cards.",
    tdpWatts: 285,
    coolingFormFactor: "2–3 slot · ~700W PSU",
    vramGb: 16,
    vramType: "GDDR6X",
    bandwidthGBs: 672,
    fp32Tflops: 44.1,
    aiTopsLabel: "~706 AI TOPS",
    aiTopsNote: "Scaled from Ada Tensor rates; lower bandwidth than 4090/50-series.",
    streetPriceUsd: 800,
    streetPriceNote: "MSRP was $799; street roughly $700–$900",
    msrpUsd: 799,
    dollarsPerGbVram: 50,
    training: "limited",
    inference: "good",
    trainingNote: "Light fine-tunes only; prefer 24 GB if training is primary.",
    inferenceNote: "Comfortable 7B–14B inference; watch context length.",
    valueNote: "Efficient CUDA option when power and noise matter.",
    affiliateQuery: "NVIDIA GeForce RTX 4070 Ti SUPER 16GB",
  },
  {
    id: "rtx-3090",
    brand: "NVIDIA",
    name: "GeForce RTX 3090",
    architecture: "Ampere",
    ecosystem: "CUDA",
    ecosystemNotes:
      "Mature CUDA; NVLink exists on some boards for dual-card experiments.",
    tdpWatts: 350,
    coolingFormFactor: "2–3.5 slot · ~750W PSU",
    vramGb: 24,
    vramType: "GDDR6X",
    bandwidthGBs: 936,
    fp32Tflops: 35.6,
    aiTopsLabel: "~284 / 568 TOPS",
    aiTopsNote: "Dense/sparse INT8 Tensor from Ampere materials — not FP4.",
    streetPriceUsd: 1300,
    streetPriceNote: "Used/renewed often $1,200–$1,500; condition varies",
    msrpUsd: 1499,
    dollarsPerGbVram: 54.2,
    training: "good",
    inference: "excellent",
    trainingNote: "Still a favorite for QLoRA on 24 GB budget builds.",
    inferenceNote: "Same 24 GB ceiling as 4090; slower tokens/sec.",
    valueNote: "Usually the best $/GB VRAM on the used CUDA market.",
    affiliateQuery: "NVIDIA GeForce RTX 3090 24GB",
    highlight: "Best used VRAM value",
  },
  {
    id: "rx-7900-xtx",
    brand: "AMD",
    name: "Radeon RX 7900 XTX",
    architecture: "RDNA 3",
    ecosystem: "ROCm",
    ecosystemNotes:
      "ROCm 7.x much improved for Ollama / llama.cpp / vLLM, but still narrower than CUDA. Check gfx1100 support for your OS.",
    tdpWatts: 355,
    coolingFormFactor: "2.5–3.5 slot · ~800W PSU",
    vramGb: 24,
    vramType: "GDDR6",
    bandwidthGBs: 960,
    fp32Tflops: 61.4,
    aiTopsLabel: "N/A (matrix accel)",
    aiTopsNote:
      "AMD does not publish NVIDIA-style sparse AI TOPS. Judge by VRAM, bandwidth, and measured tok/s.",
    streetPriceUsd: 1000,
    streetPriceNote: "MSRP $999; street often $900–$1,340 amid memory price swings",
    msrpUsd: 999,
    dollarsPerGbVram: 41.7,
    training: "limited",
    inference: "good",
    trainingNote:
      "Possible with ROCm tooling; expect more friction than CUDA for fine-tuning stacks.",
    inferenceNote:
      "Strong 24 GB inference value when ROCm stack is happy on your distro.",
    valueNote: "Top AMD pick for local LLMs — honest ROCm caveats still apply.",
    affiliateQuery: "AMD Radeon RX 7900 XTX 24GB",
    highlight: "Best AMD $/VRAM",
  },
  {
    id: "rx-9070-xt",
    brand: "AMD",
    name: "Radeon RX 9070 XT",
    architecture: "RDNA 4",
    ecosystem: "ROCm",
    ecosystemNotes:
      "Official RDNA 4 support landed in ROCm 7.2+. Newer matrix engines, but 16 GB caps model size.",
    tdpWatts: 304,
    coolingFormFactor: "2–3 slot · ~750W PSU",
    vramGb: 16,
    vramType: "GDDR6",
    bandwidthGBs: 645,
    fp32Tflops: 48.7,
    aiTopsLabel: "N/A (matrix accel)",
    aiTopsNote: "FP8 matrix improvements help small models; VRAM still rules large LLMs.",
    streetPriceUsd: 650,
    streetPriceNote: "MSRP ~$599; street roughly $600–$700",
    msrpUsd: 599,
    dollarsPerGbVram: 40.6,
    training: "poor",
    inference: "good",
    trainingNote: "Not a training card — stick to small adapters if anything.",
    inferenceNote: "Efficient for 7B–14B; skip if you need 32B+ on one GPU.",
    valueNote: "Buy for efficiency on smaller models, not VRAM headroom.",
    affiliateQuery: "AMD Radeon RX 9070 XT 16GB",
  },
];

export function suitabilityLabel(s: Suitability): string {
  switch (s) {
    case "excellent":
      return "Excellent";
    case "good":
      return "Good";
    case "limited":
      return "Limited";
    case "poor":
      return "Poor";
  }
}
