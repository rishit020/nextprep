import Image from "next/image";

/**
 * On a single-screen waitlist page the only job left for the top bar is saying
 * whose page this is — the signup CTA lives in the hero, a few lines below.
 * So this is a wordmark in a chip sized to its contents, not a full-width bar.
 */
export function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-5 z-30 flex justify-center sm:top-8">
      <p className="liquid-nav glass-sheen font-display relative inline-flex h-[43px] items-center gap-2 rounded-full pr-5 pl-3.5 text-[15px] font-extrabold tracking-[-0.02em] text-[#11172b] md:h-[47px] md:gap-2.5 md:pr-6 md:pl-4 md:text-[16px]">
        {/* Supplied artwork, keyed off its background and cropped to its own
            bounds. Decorative: the wordmark beside it already names the site. */}
        <Image
          src="/images/nextprep-mark.png"
          alt=""
          width={219}
          height={219}
          priority
          className="h-[25px] w-[25px] shrink-0 md:h-[27px] md:w-[27px]"
        />
        NextPrep
      </p>
    </header>
  );
}
