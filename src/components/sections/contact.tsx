import { Download, Mail } from "lucide-react";

import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { profile } from "@/content/profile";
import { external } from "@/lib/site";

export function Contact() {
  const { email, linkedin, github } = profile.contact;

  return (
    <Section id="contact" title="Contact">
      <Card className="gap-5 p-6">
        <p className="max-w-2xl text-base">
          Open to remote {profile.title} roles. The fastest way to reach me is
          email.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={`mailto:${email}`}>
              <Mail aria-hidden /> {email}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={linkedin} {...external}>
              LinkedIn
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={github} {...external}>
              GitHub
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={profile.cvPath}>
              <Download aria-hidden /> CV (PDF)
            </a>
          </Button>
        </div>
      </Card>
    </Section>
  );
}
