/**
 * On a single-screen waitlist page the only job left for the top bar is saying
 * whose page this is — the signup CTA lives in the hero, a few lines below.
 * So this is a wordmark in a chip sized to its contents, not a full-width bar
 * with an empty middle.
 */
export function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-5 z-30 flex justify-center sm:top-8">
      <p className="liquid-nav glass-sheen font-display relative inline-flex h-11 items-center rounded-full px-6 text-[15px] font-bold tracking-[-0.02em] text-[#11172b] md:h-12 md:px-7 md:text-[17px]">
        Unistep
      </p>
    </header>
  );
}
