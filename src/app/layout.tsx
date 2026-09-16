import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://deskforge.ai"),
  title: {
    default: "DeskForge | Local AI GPU Comparison",
    template: "%s | DeskForge",
  },
  description:
    "Compare consumer, workstation, and data-center GPUs for local LLM inference, AI image generation, and model fine-tuning.",
  keywords: [
    "local AI GPU",
    "LLM GPU comparison",
    "RTX 5090 AI",
    "Blackwell GPU",
    "CUDA vs ROCm",
    "AI workstation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "DeskForge — Choose the right GPU for local AI",
    description:
      "Compare VRAM, bandwidth, power, software support, model fit, and price across 18 AI-capable GPUs.",
    type: "website",
    url: "/",
    siteName: "DeskForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeskForge — Local AI GPU Comparison",
    description: "A practical GPU decision tool for local inference and fine-tuning.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#090d14",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
