import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { profile } from "@/content/profile";
import { formatMonth } from "@/lib/experience";
import { external } from "@/lib/site";

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.achievements.map((a) => (
          <li key={a.title}>
            <Card className="h-full hover-lift gap-2 p-5">
              <h3 className="font-semibold">{a.title}</h3>
              {a.date && (
                <p className="text-sm text-muted-foreground">
                  {formatMonth(a.date)}
                </p>
              )}
              <p>{a.detail}</p>
              {a.certificate && (
                <a
                  href={a.certificate}
                  {...external}
                  className="mt-auto text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  View certificate<span className="sr-only">: {a.title}</span>
                </a>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
