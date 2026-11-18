import type { Profile } from "./types";

export const profile = {
  name: "Vladyslav Rybak",
  title: "Full Stack Engineer",
  location: "Lviv, Ukraine",
  openToRemote: true,
  bio: [
    "I build full stack web products with TypeScript — from Next.js frontends to Node.js APIs, databases and the pipelines that ship them.",
    "At Future Wealth Group I work across frontend, backend and DevOps, and coordinate a team of 3 developers to keep work on track.",
  ],
  careerStart: "2024-08",
  topStack: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Docker",
  ],
  heroHighlight: {
    label: "Hackathon",
    value: "3rd place — BEST::HACKath0n Lviv",
  },
  roles: [
    {
      company: "Future Wealth Group",
      employmentType: "Full-time",
      workMode: "Remote",
      location: "Switzerland",
      positions: [{ title: "Full Stack Engineer", start: "2025-07" }],
      summary:
        "Coordinate a team of 3 developers to keep work on track: code reviews, shared coding standards and a team communication framework.",
      caseStudies: [
        {
          title: "Internal business platform (CRM)",
          context:
            "The business needed one internal system for day-to-day operations, holding sensitive data that each user should only partly see.",
          role: "Full stack developer",
          built: [
            "Frontend and API for the core CRM workflows",
            "Role-based access control (RBAC) enforced on the API and reflected in the UI",
            "JWT-based authentication with two-factor authentication",
          ],
          tech: [
            "TypeScript",
            "Next.js",
            "Node.js",
            "PostgreSQL",
            "JWT",
            "2FA",
          ],
          outcome:
            "Teams work from one secure internal platform, and every user sees only what their role allows.",
          flow: ["Sign in", "2FA check", "JWT issued", "RBAC on each request"],
        },
        {
          title: "Self-hosted CI/CD",
          context:
            "Releases needed to be repeatable and run on the company's own infrastructure.",
          role: "Built the delivery pipeline",
          built: [
            "Automated checks and builds on every push",
            "Containerized services deployed behind a reverse proxy",
          ],
          tech: ["GitHub Actions", "Docker", "NGINX"],
          outcome:
            "Deployments are automated and reproducible instead of manual.",
          flow: ["Push", "CI checks", "Docker build", "Deploy", "NGINX"],
        },
        {
          title: "SEO-focused landing pages",
          context: "Marketing needed fast, discoverable public pages.",
          role: "Built the pages end to end",
          built: [
            "Statically rendered landing pages with technical SEO",
            "Optimized images, fonts and metadata",
          ],
          tech: ["Next.js", "TypeScript", "Tailwind CSS"],
          outcome: "100 in all four Lighthouse categories.",
        },
      ],
    },
    {
      // TODO(owner): confirm employment type, work mode and location for Insiders.
      company: "Insiders",
      employmentType: "Full-time",
      workMode: "On-site",
      location: "Lviv, Ukraine",
      positions: [
        {
          title: "Trainee Frontend Developer",
          start: "2024-08",
          end: "2024-12",
        },
        {
          title: "Junior Frontend Developer",
          start: "2024-12",
          end: "2025-07",
        },
      ],
      highlights: [
        "Migrated a document-processing CRM from Angular to React.",
        "Mentored 2–4 developers and ran technical interviews.",
        "Built client apps from scratch in Next.js and Tailwind — e.g. a fitness app with multi-step forms, charts and i18n — scoring 95+ in Lighthouse.",
      ],
    },
  ],
  // From the CV; Express and Nest.js (backend) come from LinkedIn.
  skills: {
    Core: ["TypeScript", "JavaScript", "Node.js"],
    "Frameworks & Libraries": [
      "React",
      "Next.js",
      "Angular",
      "Express",
      "Nest.js",
    ],
    UI: ["Tailwind CSS", "shadcn/ui", "MUI", "SCSS", "Motion"],
    // TODO(owner): the CV only names React Context here; add your form/state libraries.
    "State & Forms": ["React Context"],
    "Payments & CMS": ["Stripe", "Strapi", "Payload"],
    "DevOps & Tooling": ["Git", "Docker", "NGINX", "GitHub Actions", "Vercel"],
    Databases: ["PostgreSQL", "MongoDB"],
    "AI & Productivity": ["Cursor", "Claude Code", "Codex", "Gemini"],
  },
  achievements: [
    {
      title: "3rd place — BEST::HACKath0n Lviv",
      detail: "Placed third in a team hackathon organized by BEST Lviv.",
      date: "2023-05",
      certificate: "/certificates/best-lviv-certificate.png",
    },
    {
      title: "Hackathon INT20H by BEST Kyiv",
      detail: "Participated in the INT20H hackathon.",
      date: "2023-02",
      certificate: "/certificates/best-kyiv-certificate.png",
    },
    {
      title: "Mentoring and technical interviews",
      detail:
        "Mentored 2–4 developers and ran technical interviews for new hires.",
    },
    {
      title: "Angular → React migration",
      detail: "Led the migration of a document-processing CRM to React.",
    },
    {
      title: "Lighthouse 100",
      detail:
        "Shipped landing pages scoring 100 in all four Lighthouse categories.",
    },
  ],
  education: {
    degree: "Bachelor's degree",
    field: "Information Technology",
    school: "Lviv Polytechnic National University",
    start: 2023,
    end: 2026,
  },
  languages: [
    { name: "English", level: "B2, Upper-Intermediate" },
    { name: "Ukrainian", level: "Native" },
  ],
  contact: {
    email: "rubakvlad7@gmail.com",
    linkedin: "https://www.linkedin.com/in/vladyslav-rybak/",
    github: "https://github.com/Vladykkk",
  },
  cvPath: "/cv.pdf",
} satisfies Profile;
