/**
 * On a single-screen waitlist page the only job left for the top bar is saying
 * whose page this is — the signup CTA lives in the hero, a few lines below.
 * So this is a wordmark in a chip sized to its contents, not a full-width bar.
 */
export function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-5 z-30 flex justify-center sm:top-8">
      <p className="liquid-nav glass-sheen font-display relative inline-flex h-12 items-center gap-2.5 rounded-full pr-6 pl-4 text-[16px] font-extrabold tracking-[-0.02em] text-[#11172b] md:h-[52px] md:pr-7 md:pl-[18px] md:text-[18px]">
        <LogoMark />
        Unistep
      </p>
    </header>
  );
}

/** Open book, two leaves. Drawn rather than imported — swap in the real asset
 *  when there is one. */
function LogoMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="md:h-7 md:w-7"
    >
      <defs>
        <linearGradient id="unistep-leaf-l" x1="4" y1="6" x2="14" y2="24">
          <stop stopColor="var(--accent-light)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
        <linearGradient id="unistep-leaf-r" x1="14" y1="6" x2="24" y2="24">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="#2f8f60" />
        </linearGradient>
      </defs>
      <path
        d="M14 8.9c-2-1.9-4.7-2.8-7.7-2.8-.85 0-1.5.65-1.5 1.5v11.9c0 .85.65 1.5 1.5 1.5 3 0 5.7.9 7.7 2.8V8.9Z"
        fill="url(#unistep-leaf-l)"
      />
      <path
        d="M14 8.9c2-1.9 4.7-2.8 7.7-2.8.85 0 1.5.65 1.5 1.5v11.9c0 .85-.65 1.5-1.5 1.5-3 0-5.7.9-7.7 2.8V8.9Z"
        fill="url(#unistep-leaf-r)"
      />
      <path
        d="M10.6 14.4l2.1 2.1 4.4-4.4"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity=".92"
      />
    </svg>
  );
}
