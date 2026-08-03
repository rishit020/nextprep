import { WaitlistButton } from "@/components/waitlist";

export function SiteNav() {
  return (
    <nav
      aria-label="Primary"
      className="liquid-nav glass-sheen absolute inset-x-0 top-5 z-30 mx-auto flex h-14 w-[calc(100%-2rem)] max-w-[360px] items-center justify-between rounded-full pr-1.5 pl-4 sm:top-8 md:h-[72px] md:max-w-[400px] md:pr-2.5 md:pl-6"
    >
      <span className="font-display text-[15px] font-bold tracking-[-0.02em] text-[#11172b] md:text-[17px]">
        Unistep
      </span>

      <WaitlistButton className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#11172b] pr-1 pl-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1c2440] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#11172b] md:h-[52px] md:gap-2.5 md:pr-1.5 md:pl-5 md:text-[14px]">
        Join Waitlist
        <span
          aria-hidden
          className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5 md:h-10 md:w-10"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="md:h-4 md:w-4">
            <path
              d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </WaitlistButton>
    </nav>
  );
}
