import type { Position, YearMonth } from "@/content/types";

const parse = (ym: YearMonth) => ym.split("-").map(Number) as [number, number];

/** Years since `start`, to the nearest half year (halves round up). */
export function yearsOfExperience(start: YearMonth, now = new Date()): number {
  const [y, m] = parse(start);
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  return Math.round(months / 6) / 2;
}

/** "2024-08" → "Aug 2024" */
export function formatMonth(ym: YearMonth): string {
  const [y, m] = parse(ym);
  return new Date(Date.UTC(y, m - 1)).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const formatPeriod = ({ start, end }: Position) =>
  `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
