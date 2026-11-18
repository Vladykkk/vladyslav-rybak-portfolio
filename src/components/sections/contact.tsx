import { ArrowUpRight, Download, Mail } from "lucide-react";

import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { external } from "@/lib/site";

export function Contact() {
  const { email, linkedin, github } = profile.contact;

  return (
    <Section id="contact" title="Contact">
      <div className="relative isolate overflow-hidden px-4 py-10 sm:px-6 sm:py-16">
        <span aria-hidden className="absolute inset-0 -z-10 blueprint" />
        <p className="max-w-2xl text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-4xl">
          Open to remote {profile.title} roles.{" "}
          <span className="text-muted-foreground">
            The fastest way to reach me is email.
          </span>
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button asChild size="lg">
            <a href={`mailto:${email}`}>
              <Mail aria-hidden /> {email}
            </a>
          </Button>
          {[
            ["LinkedIn", linkedin],
            ["GitHub", github],
          ].map(([label, href]) => (
            <Button key={label} asChild size="lg" variant="outline">
              <a href={href} {...external} className="group">
                {label}
                <ArrowUpRight
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Button>
          ))}
          <Button asChild size="lg" variant="outline">
            <a href={profile.cvPath}>
              <Download aria-hidden /> CV (PDF)
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
