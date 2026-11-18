import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/content/profile";
import { sections } from "@/lib/site";

const linkClass =
  "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

// Inset ring: the row scrolls, so an outer ring would be clipped.
const rowLinkClass =
  "block px-3 py-2 font-mono text-xs whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:ring-inset";

const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .join("");

const links = (className: string) =>
  sections.map(({ id, label }) => (
    <li key={id}>
      <a href={`#${id}`} className={className}>
        {label}
      </a>
    </li>
  ));

export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-md">
      <nav aria-label="Sections" className="mx-auto max-w-4xl border-x">
        <div className="flex h-14 items-center gap-1 px-2 sm:px-4">
          <a
            href="#top"
            className={`mr-auto flex items-center gap-2.5 font-semibold text-foreground! ${linkClass}`}
          >
            <span
              aria-hidden
              className="grid size-7 place-items-center rounded-md border bg-card font-mono text-[11px] tracking-tight"
            >
              {initials}
            </span>
            {profile.name}
          </a>
          <ul className="hidden md:flex">{links(`block ${linkClass}`)}</ul>
          <ThemeToggle />
        </div>
        {/* Phones: every section one tap away, no menu to open or dismiss. Edge fades come from
            shadcn's scroll-fade-x; the reveal distance is short because the row barely scrolls. */}
        <ul className="flex scroll-fade-x scroll-px-8 scrollbar-thin [scrollbar-color:var(--border)_transparent] overflow-x-auto border-t px-1 [--scroll-fade-reveal:2rem] md:hidden">
          {links(rowLinkClass)}
        </ul>
      </nav>
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-px scroll-progress bg-primary"
      />
    </header>
  );
}
