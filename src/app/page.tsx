import { Nav } from "@/components/nav";
import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 pb-16">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
