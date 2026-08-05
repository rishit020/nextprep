"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WaitlistInline } from "@/components/waitlist-inline";

const WHAT_YOU_GET = [
  "A personalized college roadmap",
  "School-specific application strategy",
  "Activity and opportunity recommendations",
  "Clear priorities for the next 30 to 90 days",
];

const WHY_DIFFERENT = [
  "Professionally built, then tailored to one student at a time",
  "Researched school by school, not generalized across them",
  "Concrete next actions, not advice you still have to decode",
  "Rebuilt as your grades, activities, and school list change",
];

/**
 * Quiet secondary action plus its dialog.
 *
 * Built on <dialog>.showModal(), which gives the focus trap, Escape handling
 * and background inertness natively — the parts hand-rolled modals usually get
 * wrong. Scroll lock and focus restoration still have to be done here.
 */
export function ExplainerModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => {
    dialogRef.current?.showModal();
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Escape closes the dialog natively, so the state has to follow the element
  // rather than the other way round.
  const handleClose = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        className="mt-4 rounded-sm text-[13px] font-medium text-[#3d4351] underline-offset-4 transition-colors hover:text-[#11172b] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#11172b] sm:text-[13.5px]"
      >
        See what we&rsquo;re building <span aria-hidden>&rarr;</span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={handleClose}
        onClick={(event) => {
          // Only the backdrop registers as a click on the dialog itself; the
          // card below is a child, so its clicks never reach here.
          if (event.target === dialogRef.current) close();
        }}
        onKeyDown={(event) => {
          // <dialog> normally closes itself on Escape, but that default does
          // not fire in every embedded/automated Chromium. Closing explicitly
          // costs nothing and makes the behaviour deterministic.
          if (event.key === "Escape") {
            event.preventDefault();
            close();
          }
        }}
        aria-labelledby="explainer-title"
        className="m-auto max-h-[92svh] w-[min(520px,calc(100vw-2rem))] overflow-visible bg-transparent p-0 backdrop:bg-[#11172b]/45 backdrop:backdrop-blur-[2px]"
      >
        <div className="modal-card max-h-[92svh] overflow-y-auto rounded-3xl border border-black/5 bg-white p-6 text-left shadow-[0_24px_60px_-20px_rgba(17,23,43,0.35)] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2
              id="explainer-title"
              className="font-display text-[21px] leading-tight font-extrabold tracking-[-0.02em] text-[#11172b] sm:text-[23px]"
            >
              What NextPrep does
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="-mt-1 -mr-1 shrink-0 rounded-full p-1.5 text-[#4f5666] transition-colors hover:bg-black/5 hover:text-[#11172b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#11172b]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M4 4L14 14M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <p className="mt-3 text-[14.5px] leading-[1.55] text-[#4f5666]">
            NextPrep turns your academics, interests, activities, intended major, and target
            colleges into a personalized plan for what to do next.
          </p>

          <Section title="What you’ll get" items={WHAT_YOU_GET} />
          <Section title="Why it’s different" items={WHY_DIFFERENT} />

          <div className="mt-6 border-t border-black/8 pt-5">
            <WaitlistInline variant="modal" />
          </div>
        </div>
      </dialog>
    </>
  );
}

function Section({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <>
      <h3 className="mt-5 text-[11px] font-bold tracking-[0.12em] text-[#4f5666] uppercase">
        {title}
      </h3>
      <ul className="mt-2.5 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[14.5px] leading-[1.45] text-[#11172b]">
            <span
              aria-hidden
              className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--accent)]"
            />
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
