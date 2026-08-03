import { HeroMedia } from "@/components/hero-media";
import { SiteNav } from "@/components/site-nav";
import { WaitlistButton, WaitlistProvider } from "@/components/waitlist";

export default function Home() {
  return (
    <WaitlistProvider>
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

          <WaitlistButton className="mt-8 inline-flex lg:mt-11 h-[52px] items-center justify-center rounded-full border border-black/5 bg-white px-8 text-[15px] font-semibold text-[#11172b] shadow-[0_10px_30px_rgba(17,23,43,0.15)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(17,23,43,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#11172b] active:translate-y-0 lg:h-[58px] lg:px-[42px] lg:text-[16px]">
            Join the waitlist
          </WaitlistButton>
        </main>
      </div>
    </WaitlistProvider>
  );
}
