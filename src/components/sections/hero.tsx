import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";

import { Download, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { profile } from "@/content/profile";
import { yearsOfExperience } from "@/lib/experience";

function Tile({
  area,
  index,
  children,
}: {
  area: string;
  index: number;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    gridArea: area,
    animationDelay: `${index * 60}ms`,
  };
  return (
    <Card
      style={style}
      className="hover-lift animate-rise justify-center gap-2 p-5"
    >
      {children}
    </Card>
  );
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
    {children}
  </p>
);

export function Hero() {
  const years = yearsOfExperience(profile.careerStart);
  const current = profile.roles[0];
  const hackathon = profile.heroHighlight;

  return (
    <section
      id="top"
      aria-label="Overview"
      className="bento scroll-mt-20 pt-6 sm:pt-10"
    >
      <Tile area="id" index={0}>
        <div className="flex items-center gap-5">
          <Image
            src="/me.jpg"
            alt={`Portrait of ${profile.name}`}
            width={900}
            height={1200}
            sizes="112px"
            priority
            className="size-24 shrink-0 rounded-2xl object-cover object-[50%_35%] sm:size-28"
          />
          <div className="min-w-0 space-y-1.5">
            <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
              {profile.name}
            </h1>
            <p className="text-lg font-medium text-primary">{profile.title}</p>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" aria-hidden />
              {profile.location}
            </p>
            {profile.openToRemote && (
              <Badge variant="secondary">Open to remote roles</Badge>
            )}
          </div>
        </div>
      </Tile>

      <Tile area="yr" index={1}>
        <Label>Experience</Label>
        <p className="text-2xl font-semibold">
          <span className="text-5xl font-bold text-primary">{years}</span> years
        </p>
      </Tile>

      <Tile area="hk" index={2}>
        <Label>{hackathon.label}</Label>
        <p className="text-lg leading-snug font-semibold">{hackathon.value}</p>
      </Tile>

      <Tile area="now" index={3}>
        <Label>Now</Label>
        <p className="text-lg leading-snug font-semibold">{current.company}</p>
        <p className="text-sm text-muted-foreground">
          {current.positions.at(-1)!.title} · {current.workMode}
        </p>
      </Tile>

      <Tile area="st" index={4}>
        <Label>Top stack</Label>
        <ul className="flex flex-wrap gap-2">
          {profile.topStack.map((skill) => (
            <li key={skill}>
              <Badge variant="outline" className="h-7 px-3 text-sm">
                {skill}
              </Badge>
            </li>
          ))}
        </ul>
      </Tile>

      <Tile area="cv" index={5}>
        <Button asChild size="lg">
          <a href={profile.cvPath}>
            <Download aria-hidden /> Download CV
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="#contact">Get in touch</a>
        </Button>
      </Tile>
    </section>
  );
}
