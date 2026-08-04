import Image from "next/image";

import { HeroMedia } from "@/components/hero-media";
import { SiteNav } from "@/components/site-nav";
import { WaitlistInline } from "@/components/waitlist-inline";

export default function Home() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[#11172b]">
      <SiteNav />
      <HeroMedia />

      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 pt-16 pb-12 text-center lg:pt-0 lg:pb-28">
        <h1 className="font-display max-w-[880px] text-balance text-[42px] leading-[1.05] font-extrabold tracking-[-0.03em] text-[#11172b] sm:text-[58px] lg:text-[76px] lg:leading-[1.02] lg:tracking-[-0.038em]">
          Your college plan, one step{" "}
          <span className="relative inline-block whitespace-nowrap">
            at a time.
            <HandUnderline />
          </span>
        </h1>

        {/* whitespace-nowrap from sm up: the line is the product promise and
            reads best unbroken. Below sm it is allowed to wrap. */}
        <p className="mt-5 max-w-[760px] text-[17px] leading-[1.4] text-[#4f5666] sm:mt-6 sm:whitespace-nowrap sm:text-[19px] lg:mt-7 lg:text-[24px] lg:leading-[1.35]">
          Customized for your intended major and target schools.
        </p>

        <div className="mt-8 flex w-full flex-col items-center lg:mt-11">
          <WaitlistInline />
          <p className="mt-3.5 text-[13px] text-[#4f5666]">
            Free while we build. One email when it opens.
          </p>
        </div>
      </main>
    </div>
  );
}

/**
 * The supplied swoosh artwork, cropped to its own bounds so it can be
 * positioned against the text without a canvas of empty transparency around
 * it. Height is left to follow the artwork's real aspect rather than being
 * stretched.
 */
function HandUnderline() {
  return (
    <Image
      src="/images/waitlist-underline.png"
      alt=""
      width={833}
      height={38}
      priority
      className="pointer-events-none absolute -bottom-[0.08em] -left-[0.03em] h-auto w-[calc(100%+0.16em)] max-w-none"
    />
  );
}
