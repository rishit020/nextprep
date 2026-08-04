"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * Background plate for the hero: still frame + looping video + readability
 * scrim, plus the motion control WCAG 2.2.2 requires for looping video.
 */
export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setPlaying] = useState(true);

  const toggleMotion = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      {/* Paints instantly, backs the video while it buffers, and is the sole
          backdrop when the visitor prefers reduced motion. */}
      <Image
        src="/images/unistep-hero-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[30%_65%] sm:object-[38%_55%] lg:object-center"
      />

      {/* ponytail: motion-reduce:hidden stops the motion, not the download.
          Gate the <source> behind a matchMedia check if the bytes ever matter. */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover object-[30%_65%] motion-reduce:hidden sm:object-[38%_55%] lg:object-center"
      >
        <source src="/videos/unistep-hero-background.webm" type="video/webm" />
        <source src="/videos/unistep-hero-background.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 32%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 72%)",
        }}
      />

      {/* Below lg the crop puts the CTA and footer line over dark grass, where
          the radial above has already faded out (measured 2.45:1). This lifts
          only the lower band; desktop keeps the untouched radial. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 62%, rgba(255,255,255,0.58) 74%, rgba(255,255,255,0.58) 100%)",
        }}
      />

      {/* WCAG 2.2.2: looping motion over 5s needs an on-page stop control.
          prefers-reduced-motion alone does not satisfy it. */}
      <button
        type="button"
        onClick={toggleMotion}
        aria-pressed={!isPlaying}
        className="glass absolute right-5 bottom-5 z-20 inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium text-[#11172b] opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#11172b] motion-reduce:hidden"
      >
        {isPlaying ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <rect x="2" y="1.5" width="3" height="9" rx="1" />
            <rect x="7" y="1.5" width="3" height="9" rx="1" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M3 1.8v8.4a.6.6 0 0 0 .92.5l6.5-4.2a.6.6 0 0 0 0-1L3.92 1.3a.6.6 0 0 0-.92.5Z" />
          </svg>
        )}
        {isPlaying ? "Pause" : "Play"}
        <span className="sr-only"> background video</span>
      </button>
    </>
  );
}
