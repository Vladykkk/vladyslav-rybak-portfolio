import { ArrowRight } from "lucide-react";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { profile } from "@/content/profile";
import type { CaseStudy } from "@/content/types";
import { formatPeriod } from "@/lib/experience";

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Card className="hover-lift gap-3 p-5">
      <h4 className="text-lg font-semibold">{study.title}</h4>
      <p className="text-muted-foreground">{study.context}</p>
      <p>
        <span className="font-medium">Role:</span> {study.role}
      </p>
      <ul className="list-disc space-y-1 pl-5">
        {study.built.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <p>
        <span className="font-medium">Outcome:</span> {study.outcome}
      </p>
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
      <ul
        aria-label="Technologies"
        className="mt-auto flex flex-wrap gap-1.5 pt-1"
      >
        {study.tech.map((t) => (
          <li key={t}>
            <Badge variant="outline">{t}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-10">
        {profile.roles.map((role) => (
          <article key={role.company} className="space-y-4">
            <header className="space-y-2">
              <h3 className="text-xl font-semibold">{role.company}</h3>
              <p className="text-sm text-muted-foreground">
                {role.employmentType} · {role.workMode} · {role.location}
              </p>
              <ul className="space-y-0.5">
                {role.positions.map((p) => (
                  <li key={p.title}>
                    <span className="font-medium">{p.title}</span>{" "}
                    <span className="text-muted-foreground">
                      ({formatPeriod(p)})
                    </span>
                  </li>
                ))}
              </ul>
            </header>
            {role.summary && <p className="max-w-3xl">{role.summary}</p>}
            {role.highlights && (
              <ul className="max-w-3xl list-disc space-y-1 pl-5">
                {role.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            {role.caseStudies && (
              <div className="grid gap-4 md:grid-cols-2">
                {role.caseStudies.map((s) => (
                  <CaseStudyCard key={s.title} study={s} />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
