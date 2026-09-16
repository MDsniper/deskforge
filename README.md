# DeskForge

DeskForge is a production-ready comparison website for consumer, professional workstation, and data-center GPUs used in local AI workloads. It evaluates hardware by dedicated VRAM, memory bandwidth, power and integration requirements, software ecosystem, model fit, training suitability, inference suitability, and approximate acquisition price.

## Stack

The site uses Next.js 16, React 19, TypeScript, and Tailwind CSS 4. It builds as a static export and is served from an unprivileged Nginx container. Client-side search, filters, sorting, and workload recommendations do not require an application server or database.

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Run the validation suite before committing:

```bash
npm run typecheck
npm run lint
npm run build
```

The production build is exported to `out/`.

## Amazon Associates configuration

Copy `.env.example` to `.env.local` and set your public tracking ID:

```bash
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourtag-20
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

The tracking ID is embedded at build time and is not a secret. If the value is absent or does not match the standard `name-20` pattern, DeskForge generates an untagged Amazon search link for testing. Merchant links use `sponsored`, `nofollow`, and safe external-window attributes. DeskForge does not display live Amazon prices.

## Docker

Build and run the production image:

```bash
docker compose up --build -d
```

Open `http://localhost:8080`. The health endpoint is `http://localhost:8080/healthz`.

The multi-stage Dockerfile installs locked dependencies, runs the static export, and copies `out/` into `nginxinc/nginx-unprivileged`. The runtime listens on port `8080`.

## Dokploy deployment

Create an application in Dokploy and connect `MDsniper/deskforge`. Use the repository root and select **Dockerfile** as the build method. Set the container port to `8080` and the health-check path to `/healthz`.

Add these build variables in Dokploy:

```text
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourtag-20
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
```

Configure the production domain and TLS, then deploy `main`. Enable GitHub automatic deployments only after the first deployment passes its health check.

Alternatively, create a Dokploy Compose service from `docker-compose.yml`. Do not configure both an Application deployment and a Compose deployment for the same domain.

## Updating the catalog

GPU records are defined in `src/data/gpus.ts`. Each record includes product segment, ecosystem notes, capacity, bandwidth, power, integration requirements, AI metric context, workload suitability, approximate price, affiliate search query, and primary manufacturer source.

Prices are editorial snapshots rather than a live feed. Update the snapshot date and review manufacturer links whenever pricing or the catalog changes. Enterprise estimates should remain clearly labeled as market estimates or quote-based pricing.

## Compliance

Review `/disclosure/` and `/privacy/` before publication and revise them for the final business entity, domain, hosting analytics, and jurisdiction. Amazon Associates participants remain responsible for the current Operating Agreement, trademark rules, link requirements, price-display restrictions, and required disclosures.
