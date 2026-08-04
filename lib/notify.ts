import "server-only";

/**
 * Best-effort "someone joined" notification via Resend.
 *
 * Deliberately swallows every failure: a signup that made it into the database
 * is a success, and must never be reported as an error to the visitor just
 * because an internal notification could not be sent.
 *
 * No-ops silently when the env vars are absent, so the app runs fine without it.
 */
export async function notifyNewSignup(email: string, total: number | null): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_NOTIFY_TO;

  if (!apiKey || !to) return;

  const from = process.env.WAITLIST_NOTIFY_FROM ?? "onboarding@resend.dev";
  const runningTotal = total === null ? "" : `\n\nThat's ${total} on the waitlist now.`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject:
          total === null
            ? "New NextPrep waitlist signup"
            : `New NextPrep waitlist signup (#${total})`,
        text: `${email} just joined the NextPrep waitlist.${runningTotal}`,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error("Waitlist notification failed:", response.status, await response.text());
    }
  } catch (error) {
    console.error("Waitlist notification failed:", error);
  }
}
