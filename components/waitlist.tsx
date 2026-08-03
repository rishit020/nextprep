"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { WaitlistModal } from "@/components/waitlist-modal";

const WaitlistContext = createContext<(() => void) | null>(null);

/**
 * Holds the modal state so the page itself can stay a Server Component.
 * Children are passed through untouched, so static markup never hydrates.
 */
export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  // Remounting on each open resets useActionState, so a previous success or
  // error never replays on the next visit.
  const [instance, setInstance] = useState(0);

  const open = useCallback(() => {
    setInstance((n) => n + 1);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(() => open, [open]);

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistModal key={instance} open={isOpen} onClose={close} />
    </WaitlistContext.Provider>
  );
}

function useOpenWaitlist() {
  const open = useContext(WaitlistContext);
  if (!open) throw new Error("WaitlistButton must be rendered inside WaitlistProvider");
  return open;
}

export function WaitlistButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const open = useOpenWaitlist();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
