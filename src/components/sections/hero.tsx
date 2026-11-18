import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";

import {
  ArrowUpRight,
  Briefcase,
  Clock,
  Download,
  Globe,
  type LucideIcon,
  Mail,
  MapPin,
} from "lucide-react";

import { LocalTime } from "@/components/local-time";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { yearsOfExperience } from "@/lib/experience";
import { external } from "@/lib/site";

/** Stagger for `animate-rise`; `i` is the order. */
const order = (i: number) => ({ "--i": i }) as CSSProperties;

function Info({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <li className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden
        className="grid size-7 shrink-0 place-items-center rounded-md border bg-card text-muted-foreground"
      >
        <Icon className="size-3.5" />
      </span>
      <span className="truncate">{children}</span>
    </li>
  );
}

export function Hero() {
  const years = yearsOfExperience(profile.careerStart);
  const current = profile.roles[0];
  const { email, github, linkedin } = profile.contact;

  const stats = [
    { label: "Experience", value: `${years} years` },
    { label: "Now at", value: current.company },
  ];

  return (
    <section id="top" aria-label="Overview">
      {/* Cover */}
      <div
        aria-hidden
        className="relative h-36 overflow-hidden border-b sm:h-48"
      >
        <span className="absolute inset-0 blueprint" />
        <span className="absolute top-3 left-4 font-mono text-[10px] tracking-widest text-muted-foreground uppercase sm:left-6">
          {profile.title}
        </span>
        <span className="absolute right-4 bottom-3 font-mono text-[10px] tracking-widest text-muted-foreground sm:right-6">
          {profile.coordinates}
        </span>
      </div>

      {/* Identity */}
      <div className="flex items-end gap-4 border-b px-4 sm:gap-6 sm:px-6">
        <Image
          src="/me.jpg"
          alt={`Portrait of ${profile.name}`}
          width={900}
          height={1200}
          sizes="128px"
          loading="eager"
          fetchPriority="high"
          className="relative z-10 -mt-12 mb-4 size-24 shrink-0 rounded-full border-4 border-background object-cover object-[50%_35%] ring-1 ring-border sm:-mt-16 sm:size-32"
        />
        <div className="min-w-0 animate-rise pb-4" style={order(0)}>
          <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="font-mono text-sm text-primary sm:text-base">
            {profile.title}
          </p>
        </div>
      </div>

      {/* Facts */}
      <ul
        style={order(1)}
        className="grid animate-rise gap-3 border-b px-4 py-5 font-mono text-sm sm:grid-cols-2 sm:px-6"
      >
        <Info icon={Briefcase}>
          {current.positions.at(-1)!.title} @ {current.company}
        </Info>
        <Info icon={MapPin}>{profile.location}</Info>
        <Info icon={Clock}>
          <LocalTime timeZone={profile.timeZone} />
        </Info>
        <Info icon={Mail}>
          <a
            href={`mailto:${email}`}
            className="underline-offset-4 hover:text-primary hover:underline"
          >
            {email}
          </a>
        </Info>
        {profile.openToRemote && (
          <Info icon={Globe}>
            <span className="inline-flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-primary motion-safe:animate-ping motion-safe:repeat-3" />
                <span className="relative size-2 rounded-full bg-primary" />
              </span>
              Open to remote roles
            </span>
          </Info>
        )}
      </ul>

      {/* Numbers */}
      <dl
        style={order(2)}
        className="grid animate-rise divide-y border-b sm:grid-cols-2 sm:divide-x sm:divide-y-0"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col-reverse gap-1 p-4 sm:px-6"
          >
            <dt className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              {s.label}
            </dt>
            <dd className="text-lg leading-snug font-semibold">{s.value}</dd>
          </div>
        ))}
      </dl>

      {/* Stack + actions */}
      <div
        style={order(3)}
        className="flex animate-rise flex-col gap-5 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <ul aria-label="Top stack" className="flex flex-wrap gap-1.5">
          {profile.topStack.map((skill) => (
            <li
              key={skill}
              className="rounded-md border bg-card px-2 py-0.5 font-mono text-xs"
            >
              {skill}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <a href={profile.cvPath}>
              <Download aria-hidden /> CV
            </a>
          </Button>
          {[
            ["GitHub", github],
            ["LinkedIn", linkedin],
          ].map(([label, href]) => (
            <Button key={label} asChild variant="outline">
              <a href={href} {...external} className="group">
                {label}
                <ArrowUpRight
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
