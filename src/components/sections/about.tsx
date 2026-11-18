import { Section } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/content/profile";

export function About() {
  const { education: edu } = profile;

  return (
    <Section id="about" title="About">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="space-y-4 text-base leading-relaxed">
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Card>
        <Card className="gap-5 py-6">
          <CardHeader className="px-6">
            <CardTitle>
              <h3>Education</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 px-6">
            <p className="font-medium">
              {edu.degree} in {edu.field}
            </p>
            <p className="text-muted-foreground">
              {edu.school}, {edu.start}–{edu.end}
            </p>
          </CardContent>
          <CardHeader className="px-6">
            <CardTitle>
              <h3>Languages</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <ul className="space-y-1">
              {profile.languages.map((l) => (
                <li key={l.name}>
                  <span className="font-medium">{l.name}</span>{" "}
                  <span className="text-muted-foreground">— {l.level}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
