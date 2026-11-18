import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { profile } from "@/content/profile";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(profile.skills).map(([group, skills]) => (
          <Card key={group} className="gap-3 p-5">
            <h3 className="font-semibold">{group}</h3>
            <ul className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <li key={s}>
                  <Badge variant="secondary">{s}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
