/** Calendar month as "YYYY-MM", e.g. "2024-08". */
export type YearMonth = `${number}-${number}`;

export type Link = { label: string; href: string };

export type Position = {
  title: string;
  start: YearMonth;
  /** Omitted for the current position, rendered as "Present". */
  end?: YearMonth;
};

export type CaseStudy = {
  title: string;
  context: string;
  role: string;
  built: string[];
  tech: string[];
  outcome: string;
  /** Owner-made flow, rendered as a step diagram; without it the tech strip is the visual. */
  flow?: string[];
};

/** Consecutive positions at one company, grouped under one heading. */
export type Role = {
  company: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  workMode: "Remote" | "On-site" | "Hybrid";
  location: string;
  positions: [Position, ...Position[]];
  summary?: string;
  /** `title` labels the branch on the experience tree; `detail` is the full line. */
  highlights?: { title: string; detail: string }[];
  caseStudies?: CaseStudy[];
};

export type SkillGroupName =
  | "Core"
  | "Frameworks & Libraries"
  | "UI"
  | "State & Forms"
  | "Payments & CMS"
  | "DevOps & Tooling"
  | "Databases"
  | "AI & Productivity";

export type Achievement = {
  title: string;
  detail: string;
  date?: YearMonth;
  certificate?: string;
};

export type HeroFact = { label: string; value: string };

export type Profile = {
  name: string;
  title: string;
  location: string;
  openToRemote: boolean;
  bio: string[];
  careerStart: YearMonth;
  topStack: string[];
  /** Hero fact card, e.g. the hackathon placement. */
  heroHighlight: HeroFact;
  roles: Role[];
  skills: Record<SkillGroupName, string[]>;
  achievements: Achievement[];
  education: {
    degree: string;
    field: string;
    school: string;
    start: number;
    end: number;
  };
  languages: { name: string; level: string }[];
  contact: { email: string; linkedin: string; github: string };
  cvPath: `/${string}.pdf`;
};
