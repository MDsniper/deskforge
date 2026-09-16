# DeskForge Replacement Plan

## Objective

DeskForge will replace the current mixed Next.js and standalone-HTML implementation with one production website for comparing AI-capable GPUs. The primary audience is a buyer selecting hardware for local LLM inference, parameter-efficient fine-tuning, image generation, and professional workstation use. The site will support affiliate monetization without presenting stale prices as live Amazon prices.

## Architecture

The repository will remain a Next.js and TypeScript project. The application will use static export so every route can be built into portable HTML, CSS, and JavaScript. A multi-stage Docker build will run the Next.js production build and copy the exported site into an unprivileged Nginx image. Dokploy will deploy the container and route its domain to container port 8080. A `/healthz` endpoint will support health checks.

GPU records will live in a typed local data module. This keeps the first release fast and deterministic while making later migration to a database or scheduled pricing feed straightforward. Client-side filtering and sorting will not require a server or expose credentials.

## User experience

The homepage will establish the buying framework before presenting the comparison tool. Users will be able to search by GPU name, filter by product segment and software ecosystem, set minimum VRAM and maximum price, and sort by capacity, bandwidth, power, price, or value. Each result will present training and inference suitability separately.

The table will include consumer, professional workstation, and data-center GPUs. Server-only products such as H200 and B200 will be labeled clearly so they are not mistaken for desktop add-in cards. Supporting sections will explain model fit, training versus inference, software compatibility, and power or cooling constraints.

## Affiliate integration

Amazon links will be generated from a public `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` environment variable. A placeholder or invalid tag will produce an untagged search link. Every commercial link will use sponsored and nofollow relationship attributes. The page will include a visible Amazon Associates disclosure and will describe prices as editorial estimates rather than live Amazon prices.

## Validation and release

The implementation will pass TypeScript and ESLint checks, produce a successful Next.js static export, and be checked for the expected output files. The completed replacement will be committed directly to the repository's `main` branch as authorized. Dokploy deployment will be attempted only through an available authenticated deployment path; otherwise the repository will remain fully deployable using the documented settings.
