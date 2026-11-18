import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const title = `${profile.name} — ${profile.title}`;
const description = `${profile.title} building web products with ${profile.topStack.join(", ")}. Based in ${profile.location}, open to remote roles.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

// Runs before first paint: saved choice wins, otherwise the OS preference.
const themeScript = `(function(){var t;try{t=localStorage.getItem("theme")}catch(e){}if(t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches)document.documentElement.classList.add("dark")})()`;

const [city, country] = profile.location.split(", ");
const current = profile.roles[0];
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: siteUrl,
  image: `${siteUrl}/me.jpg`,
  worksFor: { "@type": "Organization", name: current.company },
  address: {
    "@type": "PostalAddress",
    addressLocality: city,
    addressCountry: country,
  },
  sameAs: [profile.contact.linkedin, profile.contact.github],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
