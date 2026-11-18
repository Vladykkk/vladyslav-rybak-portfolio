import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 py-12 sm:py-16"
    >
      <h2
        id={`${id}-title`}
        className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
