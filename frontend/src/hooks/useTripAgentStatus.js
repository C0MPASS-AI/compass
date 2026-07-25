import { useEffect, useState } from 'react';

/**
 * Reveals `messages` one at a time on an interval, simulating live agent
 * status updates. Returns the messages revealed so far and whether all
 * have finished.
 */
export function useTripAgentStatus(messages, intervalMs = 1400) {
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (revealedCount >= messages.length) return;

    const timer = setTimeout(() => {
      setRevealedCount((prev) => prev + 1);
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [revealedCount, messages.length, intervalMs]);

  return {
    visibleMessages: messages.slice(0, revealedCount),
    isComplete: revealedCount >= messages.length,
  };
}