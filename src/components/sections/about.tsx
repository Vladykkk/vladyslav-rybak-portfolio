import { Section } from "@/components/section";
import { profile } from "@/content/profile";

const label =
  "mb-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase";

export function About() {
  const { education: edu } = profile;

  return (
    <Section id="about" title="About">
      <div className="grid md:grid-cols-[minmax(0,1fr)_18rem] md:divide-x">
        <div className="space-y-4 p-4 text-base leading-relaxed text-pretty sm:p-6 sm:text-lg">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="divide-y border-t md:border-t-0">
          <div className="p-4 sm:p-6">
            <h3 className={label}>Education</h3>
            <p className="font-medium">
              {edu.degree} in {edu.field}
            </p>
            <p className="text-sm text-muted-foreground">
              {edu.school}, {edu.start}–{edu.end}
            </p>
          </div>
          <div className="p-4 sm:p-6">
            <h3 className={label}>Languages</h3>
            <ul className="space-y-1">
              {profile.languages.map((l) => (
                <li key={l.name} className="flex justify-between gap-4">
                  <span className="font-medium">{l.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {l.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
