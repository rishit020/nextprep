"use client";

import { useActionState, useEffect, useRef } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";

const initialState: WaitlistState = { status: "idle" };

export function WaitlistModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [state, formAction, isPending] = useActionState(joinWaitlist, initialState);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      if (!dialog.open) dialog.showModal();
      // React's autoFocus fires before showModal(), so it no-ops and the dialog
      // hands focus to the first tabbable child (Close). Place it explicitly.
      inputRef.current?.focus();
      return;
    }

    // Escape closes the dialog natively before this runs, so never gate the
    // focus restore on dialog.open — it is already false by then.
    if (dialog.open) dialog.close();
    triggerRef.current?.focus();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-labelledby="waitlist-heading"
      className="m-auto bg-transparent p-0 backdrop:bg-[#11172b]/45 backdrop:backdrop-blur-sm"
    >
      {/* The card is a child so backdrop-click detection never fires on padding. */}
      <div className="w-[min(420px,calc(100vw-2rem))] rounded-3xl border border-black/5 bg-white p-8 text-left shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <h2
            id="waitlist-heading"
            className="font-display text-xl font-semibold tracking-[-0.02em] text-[#11172b]"
          >
            Join the waitlist
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#11172b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#11172b]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M4 4L14 14M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {state.status === "success" ? (
          <p role="status" className="mt-6 text-[15px] leading-relaxed text-slate-600">
            {state.message}
          </p>
        ) : (
          <form action={formAction} className="mt-5 flex flex-col gap-3">
            <p className="-mt-1 mb-1 text-[15px] leading-relaxed text-[#4f5666]">
              We&rsquo;ll email you the moment Unistep opens.
            </p>
            <label htmlFor="waitlist-email" className="text-sm font-medium text-[#11172b]">
              Email address
            </label>
            <input
              ref={inputRef}
              id="waitlist-email"
              name="email"
              type="email"
              required
              maxLength={254}
              placeholder="you@school.edu"
              aria-invalid={state.status === "error"}
              aria-describedby={state.status === "error" ? "waitlist-error" : undefined}
              className="h-12 rounded-xl border border-black/10 px-4 text-[15px] text-[#11172b] outline-none transition-colors focus-visible:border-[#11172b] focus-visible:ring-2 focus-visible:ring-[#11172b]/20"
            />
            {state.status === "error" && (
              <p id="waitlist-error" role="alert" className="text-sm text-red-600">
                {state.message}
              </p>
            )}
            <button
              type="submit"
              // aria-disabled over disabled: a disabled button drops focus mid-submit.
              aria-disabled={isPending}
              onClick={(event) => {
                if (isPending) event.preventDefault();
              }}
              className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-[#11172b] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#1c2440] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#11172b] aria-disabled:opacity-60"
            >
              {isPending ? "Joining…" : "Join the waitlist"}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
