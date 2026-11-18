import type { ReactNode } from "react";

/** Hatched strip between sections; its top and bottom lines run the full viewport width. */
export function Divider() {
  return (
    <div
      aria-hidden
      className="relative h-8 border-y hatch before:absolute before:-inset-y-px before:left-1/2 before:w-screen before:-translate-x-1/2 before:border-y before:border-border before:content-['']"
    />
  );
}

export function Section({
  id,
  title,
  count,
  children,
}: {
  id: string;
  title: string;
  /** Shown as a small superscript after the title, e.g. "Skills (8)". */
  count?: number;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <h2
        id={`${id}-title`}
        className="reveal border-b px-4 py-3 text-3xl font-semibold tracking-tight sm:px-6"
      >
        {title}
        {count !== undefined && (
          <sup className="ml-1 font-mono text-sm font-normal text-muted-foreground">
            ({count})
          </sup>
        )}
      </h2>
      <div className="reveal">{children}</div>
    </section>
  );
}
