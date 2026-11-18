// TODO(owner): update after the Vercel import or when a custom domain is attached.
export const siteUrl = "https://vladyslav-rybak-portfolio.vercel.app";

/** Spread on external links: new tab, no access to this window. */
export const external = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;
