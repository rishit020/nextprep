import Image from "next/image";

import { ExplainerModal } from "@/components/explainer-modal";
import { HeroMedia } from "@/components/hero-media";
import { SiteNav } from "@/components/site-nav";
import { WaitlistInline } from "@/components/waitlist-inline";

export default function Home() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[#11172b]">
      <SiteNav />
      <HeroMedia />

      {/* Bottom padding lifts the group so the form sits over open sky rather
          than the detailed hillside. Scaled to viewport height rather than
          fixed: ~32px of lift at 900px tall, tapering to none on short
          screens where the headroom under the logo matters more. */}
      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 pt-16 pb-12 text-center lg:pt-0 lg:pb-[clamp(5rem,16vh,10rem)]">
        <h1 className="font-display max-w-[880px] text-balance text-[42px] leading-[1.05] font-extrabold tracking-[-0.03em] text-[#11172b] sm:text-[58px] lg:text-[76px] lg:leading-[1.02] lg:tracking-[-0.038em]">
          Your college plan, one step{" "}
          <span className="relative inline-block whitespace-nowrap">
            at a time.
            <HandUnderline />
          </span>
        </h1>

        <p className="mt-5 max-w-[640px] text-balance text-[16px] leading-[1.45] text-[#4f5666] sm:mt-6 sm:text-[18px] lg:mt-7 lg:text-[21px] lg:leading-[1.4]">
          Personalized next steps, school-specific strategy, and a clear plan for what to do now.
        </p>

        <div className="mt-8 flex w-full flex-col items-center lg:mt-10">
          <WaitlistInline />
          <ExplainerModal />
        </div>
      </main>
    </div>
  );
}

/**
 * The supplied swoosh artwork, cropped to its own bounds so it can be
 * positioned against the text without a canvas of empty transparency around it.
 *
 * Centred on the phrase and held slightly narrower than it, so the mark reads
 * as placed rather than as an overrun. Height is set a little above the true
 * aspect to give it weight at display sizes.
 */
function HandUnderline() {
  return (
    <Image
      src="/images/waitlist-underline.png"
      alt=""
      width={833}
      height={38}
      priority
      className="underline-draw pointer-events-none absolute -bottom-[0.1em] left-1/2 h-[0.13em] w-[88%] max-w-none -translate-x-1/2"
    />
  );
}
