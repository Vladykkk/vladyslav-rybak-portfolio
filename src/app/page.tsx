import { Nav } from "@/components/nav";
import { Divider } from "@/components/section";
import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { profile } from "@/content/profile";

// Experience years, role durations and the footer year are computed at render time.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-4xl border-x">
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Experience />
        <Divider />
        <Skills />
        <Divider />
        <Achievements />
        <Divider />
        <Contact />
        <Divider />
        <footer className="flex flex-wrap items-center justify-between gap-2 px-4 py-6 font-mono text-xs text-muted-foreground sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a
            href="#top"
            className="transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            Back to top ↑
          </a>
        </footer>
      </main>
    </>
  );
}
