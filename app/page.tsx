import { HeroMedia } from "@/components/hero-media";
import { SiteNav } from "@/components/site-nav";
import { WaitlistInline } from "@/components/waitlist-inline";

export default function Home() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[#11172b]">
      <SiteNav />
      <HeroMedia />

      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 pt-16 pb-12 text-center lg:pt-0 lg:pb-28">
        <h1 className="font-display max-w-[820px] text-balance text-[42px] leading-[1.02] font-bold tracking-[-0.03em] text-[#11172b] sm:text-[58px] lg:text-[78px] lg:leading-[0.98] lg:tracking-[-0.042em]">
          Your college plan, one step at a time.
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
