/**
 * On a single-screen waitlist page the only job left for the top bar is saying
 * whose page this is — the signup CTA lives in the hero, a few lines below.
 * So this is a wordmark in a chip sized to its contents, not a full-width bar.
 */
export function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-5 z-30 flex justify-center sm:top-8">
      <p className="liquid-nav glass-sheen font-display relative inline-flex h-[43px] items-center gap-2 rounded-full pr-5 pl-3.5 text-[15px] font-extrabold tracking-[-0.02em] text-[#11172b] md:h-[47px] md:gap-2.5 md:pr-6 md:pl-4 md:text-[16px]">
        <LogoMark />
        NextPrep
      </p>
    </header>
  );
}

/**
 * The NextPrep mark: an open book in navy outline with a green check swept
 * across it, the tail running past the book's top-right corner. The check is a
 * filled shape, not a stroke, because it tapers to a point at both ends.
 *
 * Traced from the supplied artwork. Drop the real file into public/ and swap
 * this for an <Image> if you would rather ship the original.
 */
function LogoMark() {
  return (
    <svg
      width="30"
      height="25"
      viewBox="0 0 62 52"
      fill="none"
      aria-hidden="true"
      className="shrink-0 md:h-[27px] md:w-8"
    >
      <path
        d="M31 12.8C26.2 10.1 17.6 8.8 7.4 8.8V38.2C17.6 38.2 26.2 40.5 31 44.6C35.8 40.5 44.4 38.2 54.6 38.2V8.8C44.4 8.8 35.8 10.1 31 12.8Z"
        stroke="#11172b"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <path d="M31 12.8V44.6" stroke="#11172b" strokeWidth="3.4" strokeLinecap="round" />
      <path
        d="M13.6 21.2C16.2 20.2 18.8 23 21.2 25.8C23.8 28.8 27 32.4 29.2 35C34.8 28.4 45 16.4 52.8 7.6C54.4 5.9 56.6 7.4 55.2 9.4C48.2 19.4 37.6 31.8 32.2 38.6C31 40.1 29 40 27.8 38.4C25 34.6 18.8 27.2 14.8 23.8C13.2 22.4 12.8 21.5 13.6 21.2Z"
        fill="var(--mark-green)"
        // Dilates the traced outline so the mark still reads at 30px, without
        // flattening the taper the way a plain stroked check would.
        stroke="var(--mark-green)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
