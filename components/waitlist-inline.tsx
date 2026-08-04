"use client";

import { useActionState, useId } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";

const initialState: WaitlistState = { status: "idle" };

type Variant = "hero" | "modal";

/**
 * Email capture. One server action, two presentations: the large pill that sits
 * over the hero photograph, and a compact version for the explainer modal's
 * white card, where the glass treatment would have nothing to refract.
 */
export function WaitlistInline({ variant = "hero" }: { variant?: Variant }) {
  const [state, formAction, isPending] = useActionState(joinWaitlist, initialState);
  // Both variants can be mounted at once (hero + open modal), so the field id
  // has to be generated rather than hard-coded or the label binds to the wrong one.
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const isModal = variant === "modal";

  if (state.status === "success") {
    return (
      <p
        role="status"
        className={`flex items-center gap-2.5 font-medium text-[#11172b] ${
          isModal ? "justify-start text-[14px]" : "justify-center text-[15px]"
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
    <div className={isModal ? "w-full" : "w-full max-w-[440px]"}>
      <form
        action={formAction}
        className={
          isModal
            ? "flex h-[52px] items-center gap-2 rounded-full border border-black/10 bg-white p-1.5 pl-3.5 transition-shadow focus-within:border-[#0d1220] focus-within:shadow-[0_0_0_3px_rgb(var(--accent-rgb)/0.22)]"
            : "glass field-glow flex h-[62px] items-center gap-2 rounded-full p-1.5 pl-4"
        }
      >
        <label htmlFor={fieldId} className="sr-only">
          Email address
        </label>
        <svg
          width={isModal ? "17" : "19"}
          height={isModal ? "17" : "19"}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 text-[#4f5666]/70 ${isModal ? "" : "ml-1"}`}
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
          id={fieldId}
          name="email"
          type="email"
          required
          maxLength={254}
          placeholder="you@school.edu"
          aria-invalid={state.status === "error"}
          aria-describedby={state.status === "error" ? errorId : undefined}
          className={`h-full min-w-0 flex-1 bg-transparent text-[#11172b] placeholder:text-[#4f5666]/65 outline-none ${
            isModal ? "text-[14px]" : "text-[15px]"
          }`}
        />
        <button
          type="submit"
          // aria-disabled over disabled: a disabled button drops focus mid-submit.
          aria-disabled={isPending}
          onClick={(event) => {
            if (isPending) event.preventDefault();
          }}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0d1220] font-bold whitespace-nowrap text-white transition-colors hover:bg-[#1c2440] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d1220] aria-disabled:opacity-60 ${
            isModal
              ? "h-[42px] px-4 text-[13px]"
              : "h-[50px] px-4 text-[14px] shadow-[0_0_0_1px_rgb(var(--accent-rgb)/0.6),0_6px_22px_-4px_rgb(var(--accent-rgb)/0.7)] sm:gap-2 sm:px-6 sm:text-[15px]"
          }`}
        >
          {isPending ? "Sending…" : "Get early access"}
          {!isPending && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              // Below sm the longer label leaves the field too little room for a
              // full address; the arrow is the affordance that can go.
              className="hidden sm:block"
            >
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
          className={`mt-2.5 text-[14px] text-red-600 ${isModal ? "" : "text-center"}`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
