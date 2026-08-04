"use client";

import { useActionState, useId } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";

const initialState: WaitlistState = { status: "idle" };

/**
 * Inline email capture. Same server action as the modal — this is just the
 * lower-friction path, so the visitor never has to open a dialog to sign up.
 *
 * `tone` swaps the palette for the two backgrounds it sits on: the photographic
 * hero (light) and the closing navy panel (dark).
 */
export function WaitlistInline({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [state, formAction, isPending] = useActionState(joinWaitlist, initialState);
  const errorId = useId();
  const isDark = tone === "dark";

  if (state.status === "success") {
    return (
      <p
        role="status"
        className={`flex items-center justify-center gap-2.5 text-[15px] font-medium ${
          isDark ? "text-white" : "text-[#11172b]"
        }`}
      >
        <span
          aria-hidden
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-white"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2 4.8 8.5 9.5 3.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {state.message}
      </p>
    );
  }

  return (
    <div className="w-full max-w-[440px]">
      <form
        action={formAction}
        className={`flex h-[62px] items-center gap-2 rounded-full p-1.5 pl-4 transition-shadow ${
          isDark
            ? "bg-white/10 ring-1 ring-white/20 focus-within:ring-white/50"
            : "glass shadow-[0_10px_36px_-8px_rgba(76,183,130,0.42)] focus-within:shadow-[0_10px_36px_-8px_rgba(76,183,130,0.55),0_0_0_3px_rgba(76,183,130,0.28)]"
        }`}
      >
        <label htmlFor="waitlist-inline-email" className="sr-only">
          Email address
        </label>
        <svg
          width="19"
          height="19"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={`ml-1 shrink-0 ${isDark ? "text-white/45" : "text-[#4f5666]/70"}`}
        >
          <rect
            x="2"
            y="4.25"
            width="16"
            height="11.5"
            rx="2.4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m3.4 6.2 5.5 4.1a2 2 0 0 0 2.2 0l5.5-4.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <input
          id="waitlist-inline-email"
          name="email"
          type="email"
          required
          maxLength={254}
          placeholder="you@school.edu"
          aria-invalid={state.status === "error"}
          aria-describedby={state.status === "error" ? errorId : undefined}
          className={`h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none ${
            isDark
              ? "text-white placeholder:text-white/45"
              : "text-[#11172b] placeholder:text-[#4f5666]/65"
          }`}
        />
        <button
          type="submit"
          // aria-disabled over disabled: a disabled button drops focus mid-submit.
          aria-disabled={isPending}
          onClick={(event) => {
            if (isPending) event.preventDefault();
          }}
          className={`inline-flex h-[50px] shrink-0 items-center gap-1.5 rounded-full px-4 text-[14px] font-bold whitespace-nowrap transition-colors sm:gap-2 sm:px-6 sm:text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:opacity-60 ${
            isDark
              ? "bg-white text-[#11172b] hover:bg-white/90 focus-visible:outline-white"
              : "bg-[#0d1220] text-white shadow-[0_0_0_1px_rgba(76,183,130,0.55),0_6px_22px_-4px_rgba(76,183,130,0.65)] hover:bg-[#1c2440] focus-visible:outline-[#0d1220]"
          }`}
        >
          {isPending ? "Joining…" : "Join waitlist"}
          {!isPending && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h9.5M12.5 8 9 4.5M12.5 8 9 11.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </form>

      {state.status === "error" && (
        <p
          id={errorId}
          role="alert"
          className={`mt-2.5 text-center text-[14px] ${isDark ? "text-red-300" : "text-red-600"}`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
