import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Privacy Policy", description: "DeskForge privacy policy." };

export default function PrivacyPage() {
  return (
    <>
      <div id="top" /><SiteHeader />
      <main className="min-h-[70vh] bg-[#090d14] px-5 pb-24 pt-32 sm:px-8">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow">Site policy</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Privacy policy</h1>
          <div className="mt-10 space-y-6 text-base leading-8 text-slate-400">
            <p>DeskForge is delivered as a static website. The application does not require an account and does not directly collect names, email addresses, payment information, or model prompts.</p>
            <p>The hosting provider may process standard technical logs such as IP address, request time, requested path, user agent, and error information for security and operations. Retention and processing depend on the deployment provider’s configuration.</p>
            <p>Outbound merchant and manufacturer links open third-party websites. Those services apply their own cookies, analytics, advertising, and privacy policies. DeskForge does not control their processing.</p>
            <p>If analytics, advertising, contact forms, or personalization are added later, this policy must be updated before those features are enabled.</p>
            <p><Link className="text-cyan-200 hover:text-cyan-100" href="/">Return to the GPU comparison</Link></p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
