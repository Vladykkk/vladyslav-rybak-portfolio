import { cn } from "cn";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/content/profile";
import type { CaseStudy, Role } from "@/content/types";
import { formatPeriod } from "@/lib/experience";

import { ExperienceTree, type TreeNode } from "./experience-tree";

const dt = "text-sm font-medium text-muted-foreground sm:text-base";
const meta = (role: Role) =>
  `${role.employmentType}, ${role.workMode.toLowerCase()}, ${role.location}`;

function RoleLabel({ role }: { role: Role }) {
  return (
    <>
      <span className="block text-lg leading-7 font-semibold">
        {role.company}
      </span>
      {role.positions.toReversed().map((p) => (
        <span key={p.title} className="block text-sm">
          {p.title}{" "}
          <span className="text-muted-foreground">{formatPeriod(p)}</span>
        </span>
      ))}
      <span className="block text-sm text-muted-foreground">{meta(role)}</span>
    </>
  );
}

function RolePanel({ role, highlight }: { role: Role; highlight?: number }) {
  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <p className="text-sm text-muted-foreground">{meta(role)}</p>
        <h3 className="text-2xl font-semibold tracking-tight">
          {role.company}
        </h3>
      </header>
      <ol className="space-y-1">
        {role.positions.toReversed().map((p) => (
          <li key={p.title} className="flex flex-wrap gap-x-3">
            <span className="font-medium">{p.title}</span>
            <span className="text-muted-foreground">{formatPeriod(p)}</span>
          </li>
        ))}
      </ol>
      {role.summary && <p className="text-base">{role.summary}</p>}
      {role.highlights && (
        <ul className="list-disc space-y-1.5 pl-5 text-base marker:text-primary">
          {role.highlights.map((h, i) => (
            <li
              key={h.title}
              className={cn(
                highlight !== undefined &&
                  (i === highlight
                    ? "font-medium"
                    : "text-muted-foreground marker:text-foreground/25"),
              )}
            >
              {h.detail}
            </li>
          ))}
        </ul>
      )}
      {role.caseStudies && highlight === undefined && (
        <p className="text-muted-foreground">
          Pick a project on the tree to see what I built there.
        </p>
      )}
    </div>
  );
}

function StudyPanel({ role, study }: { role: Role; study: CaseStudy }) {
  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <p className="text-sm text-muted-foreground">{role.company}</p>
        <h3 className="text-2xl font-semibold tracking-tight">{study.title}</h3>
      </header>
      <p className="text-base text-muted-foreground">{study.context}</p>
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
      <dl className="grid gap-x-6 gap-y-1 text-base sm:grid-cols-[6rem_1fr] sm:gap-y-3">
        <dt className={dt}>Role</dt>
        <dd>{study.role}</dd>
        <dt className={cn(dt, "mt-3 sm:mt-0")}>Built</dt>
        <dd>
          <ul className="list-disc space-y-1 pl-5 marker:text-primary">
            {study.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </dd>
        <dt className={cn(dt, "mt-3 sm:mt-0")}>Outcome</dt>
        <dd>{study.outcome}</dd>
      </dl>
      <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
        {study.tech.map((t) => (
          <li key={t}>
            <Badge variant="outline">{t}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Company nodes, each followed by its case studies and highlights as branches. */
const nodes: TreeNode[] = profile.roles.flatMap((role, r) => [
  {
    id: `role-${r}`,
    branch: false,
    label: <RoleLabel role={role} />,
    panel: <RolePanel role={role} />,
  },
  ...(role.caseStudies ?? []).map((study, s) => ({
    id: `role-${r}-s${s}`,
    branch: true,
    label: study.title,
    panel: <StudyPanel role={role} study={study} />,
  })),
  ...(role.highlights ?? []).map((h, i) => ({
    id: `role-${r}-h${i}`,
    branch: true,
    label: h.title,
    panel: <RolePanel role={role} highlight={i} />,
  })),
]);

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ExperienceTree nodes={nodes} />
    </Section>
  );
}
