import { Section } from "@/components/section";
import { profile } from "@/content/profile";

export function Skills() {
  const groups = Object.entries(profile.skills);

  return (
    <Section id="skills" title="Skills" count={groups.length}>
      {/* gap-px over a border-colored background draws the hairline grid. */}
      <div className="grid gap-px bg-border sm:grid-cols-2">
        {groups.map(([group, skills]) => (
          <div key={group} className="group bg-background p-4 sm:p-6">
            <h3 className="mb-3 font-mono text-[11px] tracking-widest text-muted-foreground uppercase transition-colors group-hover:text-primary">
              {group}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <li
                  key={s}
                  className="rounded-md border bg-card px-2 py-0.5 text-sm transition-colors hover:border-primary/60"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
