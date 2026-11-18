import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/section";
import { profile } from "@/content/profile";
import { formatMonth } from "@/lib/experience";
import { external } from "@/lib/site";

export function Achievements() {
  return (
    <Section
      id="achievements"
      title="Achievements"
      count={profile.achievements.length}
    >
      <ul className="divide-y">
        {profile.achievements.map((a) => (
          <li
            key={a.title}
            className="grid gap-1 p-4 transition-colors hover:bg-muted/50 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6 sm:p-6"
          >
            <p className="pt-0.5 font-mono text-xs text-muted-foreground">
              {a.date ? formatMonth(a.date) : "Ongoing"}
            </p>
            <div className="space-y-1">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-muted-foreground">{a.detail}</p>
              {a.certificate && (
                <a
                  href={a.certificate}
                  {...external}
                  className="group inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  View certificate<span className="sr-only">: {a.title}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
