import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/content/profile";
import { sections } from "@/lib/site";

const linkClass =
  "rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

export function Nav() {
  const links = sections.map(({ id, label }) => (
    <li key={id}>
      <a href={`#${id}`} className={`block ${linkClass}`}>
        {label}
      </a>
    </li>
  ));

  return (
    <header className="sticky top-0 z-10 border-b bg-background/85 backdrop-blur">
      <nav
        aria-label="Sections"
        className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4"
      >
        <a
          href="#top"
          className={`mr-auto font-semibold text-foreground! ${linkClass}`}
        >
          {profile.name}
        </a>
        <ul className="hidden sm:flex">{links}</ul>
        <details className="relative sm:hidden">
          <summary className={`cursor-pointer list-none ${linkClass}`}>
            Menu
          </summary>
          <ul className="absolute right-0 mt-2 w-48 rounded-lg border bg-popover p-2 shadow-lg">
            {links}
          </ul>
        </details>
        <ThemeToggle />
      </nav>
    </header>
  );
}
