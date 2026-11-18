import { ArrowRight, ChevronDown, CodeXml } from "lucide-react";

import { Section } from "@/components/section";
import { profile } from "@/content/profile";
import type { CaseStudy, Role } from "@/content/types";
import { formatDuration, formatPeriod } from "@/lib/experience";

const chip =
  "rounded-md border bg-card px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground";
const Sep = () => <span aria-hidden className="h-3 w-px bg-border" />;

function Study({ study, open }: { study: CaseStudy; open: boolean }) {
  return (
    <details open={open} className="group disclosure">
      <summary className="flex cursor-pointer list-none items-center gap-2 py-1.5 font-medium transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
        <ChevronDown
          aria-hidden
          className="size-4 shrink-0 -rotate-90 text-muted-foreground group-open:rotate-0 motion-safe:transition-transform"
        />
        {study.title}
      </summary>
      <div className="space-y-3 pt-1 pb-4 pl-6 text-sm">
        <p className="text-muted-foreground">{study.context}</p>
        {study.flow && (
          <ol
            aria-label="Flow"
            className="flex flex-wrap items-center gap-1.5 text-xs font-medium"
          >
            {study.flow.map((step, i) => (
              <li key={step} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ArrowRight className="size-3.5 text-primary" aria-hidden />
                )}
                <span className="rounded-md bg-accent px-2 py-1 text-accent-foreground">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        )}
        <ul className="list-disc space-y-1 pl-4 marker:text-primary">
          {study.built.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p>
          <span className="font-medium">Role:</span> {study.role}.{" "}
          <span className="font-medium">Outcome:</span> {study.outcome}
        </p>
        <ul aria-label="Technologies" className="flex flex-wrap gap-1">
          {study.tech.map((t) => (
            <li key={t} className={chip}>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

function RoleItem({ role }: { role: Role }) {
  const current = !role.positions.at(-1)!.end;

  return (
    <li className="px-4 py-5 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span
          aria-hidden
          className="grid size-6 place-items-center rounded-md border bg-card font-mono text-[11px] font-semibold"
        >
          {role.company[0]}
        </span>
        <h3 className="text-lg font-semibold tracking-tight">{role.company}</h3>
        <p className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          {role.location} ({role.workMode})
          {current && (
            <>
              <span aria-hidden className="size-1.5 rounded-full bg-primary" />
              <span className="sr-only">, current role</span>
            </>
          )}
        </p>
      </div>

      <div className="relative">
        {/* Line linking the positions and what was done there. */}
        <span
          aria-hidden
          className="absolute top-3 bottom-1 left-3 w-px bg-border"
        />
        <ol className="space-y-3">
          {role.positions.toReversed().map((p) => (
            <li key={p.title} className="relative pl-9">
              <span
                aria-hidden
                className="absolute top-0.5 left-0 grid size-6 place-items-center rounded-md border bg-card text-muted-foreground"
              >
                <CodeXml className="size-3.5" />
              </span>
              <h4 className="font-medium">{p.title}</h4>
              <p className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                {role.employmentType}
                <Sep />
                {formatPeriod(p)}
                <Sep />
                {formatDuration(p)}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-4 space-y-3 pl-9">
          {role.summary && <p>{role.summary}</p>}
          {role.highlights && (
            <ul className="list-disc space-y-1.5 pl-4 marker:text-primary">
              {role.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          {role.caseStudies && (
            <div>
              {role.caseStudies.map((s, i) => (
                <Study key={s.title} study={s} open={i === 0} />
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <Section id="experience" title="Experience" count={profile.roles.length}>
      <ol className="divide-y">
        {profile.roles.map((role) => (
          <RoleItem key={role.company} role={role} />
        ))}
      </ol>
    </Section>
  );
}
