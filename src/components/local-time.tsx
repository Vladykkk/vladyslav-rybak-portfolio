"use client";

import { useSyncExternalStore } from "react";

const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 10_000);
  return () => clearInterval(id);
};

/** Current time in `timeZone`. The static HTML shows the zone name until hydration. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
        timeZoneName: "short",
      }),
    () => null,
  );
  return <>{time ? `${time} local time` : timeZone}</>;
}
