"use client";

import { useLayoutEffect } from "react";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

// Saved choice wins, otherwise the OS preference. Must stay self-contained:
// ThemeScript inlines its source to run before first paint.
function applyTheme() {
  let t: string | null = null;
  try {
    t = localStorage.getItem("theme");
  } catch {}
  document.documentElement.classList.toggle(
    "dark",
    t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches,
  );
}

/**
 * Rendered in place in <head>, so it runs before first paint. `text/plain` on the
 * client keeps React from warning about (or re-running) a <script>.
 */
export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: `(${applyTheme})()` }}
    />
  );
}

export function ThemeToggle() {
  // Dev Strict Mode remount resets <html> className, dropping `dark`. No-op in production.
  useLayoutEffect(applyTheme, []);

  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark theme"
      onClick={toggle}
    >
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </Button>
  );
}
