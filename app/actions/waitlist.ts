"use server";

import { getSupabaseClient } from "@/lib/supabase";
import { notifyNewSignup } from "@/lib/notify";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const DUPLICATE_KEY = "23505";

export async function joinWaitlist(
  _prevState: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    // Fail loudly rather than telling someone they joined a list that does not exist.
    console.error("Waitlist signup dropped: SUPABASE_URL / SUPABASE_ANON_KEY are not set.");
    return {
      status: "error",
      message: "Signups aren't connected yet. Please try again later.",
    };
  }

  const { error } = await supabase.from("waitlist_signups").insert({ email });

  if (error && error.code !== DUPLICATE_KEY) {
    console.error("Waitlist insert failed:", error.message);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  // A duplicate is still a success from the visitor's point of view — they are
  // on the list — but it must not notify again, and saying so plainly beats
  // pretending the second submit did something.
  if (error) {
    return {
      status: "success",
      message: "You're already on the list. We'll be in touch.",
    };
  }

  // waitlist_count() is security definer and returns an aggregate only, so
  // this never exposes the list itself. Null on failure — a broken count
  // must not cost us the notification.
  const { data: total } = await supabase.rpc("waitlist_count");
  await notifyNewSignup(email, typeof total === "number" ? total : null);

  return {
    status: "success",
    message: "You're on the list. We'll email you when NextPrep opens.",
  };
}
