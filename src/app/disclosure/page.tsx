import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Affiliate Disclosure", description: "DeskForge affiliate relationship and editorial disclosure." };

export default function DisclosurePage() {
  return (
    <>
      <div id="top" /><SiteHeader />
      <main className="min-h-[70vh] bg-[#090d14] px-5 pb-24 pt-32 sm:px-8">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow">Commercial transparency</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Affiliate disclosure</h1>
          <div className="mt-10 space-y-6 text-base leading-8 text-slate-400">
            <p><strong className="text-white">DeskForge may earn commissions from qualifying purchases.</strong> When a valid Amazon Associates tracking ID is configured, links labeled “Check Amazon” are affiliate search links.</p>
            <p>Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. Product placement, suitability assessments, and editorial conclusions are not determined by Amazon, NVIDIA, AMD, Intel, or a product seller.</p>
            <p>Prices displayed on DeskForge are dated editorial estimates. They are not live Amazon prices, guarantees, or offers. Availability, seller, condition, tax, shipping, warranty, and final price must be confirmed on the merchant’s site.</p>
            <p>Enterprise cards may link only to manufacturer specifications because they are generally sold through qualified systems and quote-based channels rather than normal consumer retail.</p>
            <p><Link className="text-cyan-200 hover:text-cyan-100" href="/">Return to the GPU comparison</Link></p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
