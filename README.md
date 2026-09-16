# DeskForge — Local AI GPU Comparison

Affiliate-style comparison site for consumer/prosumer GPUs used in **local AI** workloads (training vs inference). Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- Dense comparison table: ecosystem (CUDA / ROCm), TDP, cooling/form factor, VRAM, bandwidth, compute, street price, $/GB, training vs inference suitability
- Amazon Associates–ready product links via a **placeholder** tag (`YOURTAG-20`) — swap when your Associates account is approved
- Original copy focused on home/local AI buyers (not a scrape of third-party sites)

## Run locally

```bash
npm install
npm run dev -- --port 43127 --hostname 127.0.0.1
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

### Affiliate tag

Set your real Associates tag when ready:

```bash
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourtag-20 npm run dev -- --port 43127
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Data notes

GPU specs and approximate US street prices are researched estimates (September 2026). Prices are volatile; AI TOPS figures are often sparse/marketing peaks — prefer VRAM + bandwidth for LLM sizing. See project store docs for source notes when available.
