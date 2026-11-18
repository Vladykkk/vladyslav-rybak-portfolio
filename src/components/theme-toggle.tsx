"use client";

import { type MouseEvent, useLayoutEffect } from "react";

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

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const flip = () => {
      const dark = root.classList.toggle("dark");
      try {
        // Picking the OS scheme again means "follow the OS", so drop the override.
        if (matchMedia("(prefers-color-scheme: dark)").matches === dark) {
          localStorage.removeItem("theme");
        } else {
          localStorage.setItem("theme", dark ? "dark" : "light");
        }
      } catch {}
    };

    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return flip();
    }
    // Grow the new theme as a circle from the button's center (works for keyboard too).
    const r = e.currentTarget.getBoundingClientRect();
    root.style.setProperty("--vt-x", `${r.left + r.width / 2}px`);
    root.style.setProperty("--vt-y", `${r.top + r.height / 2}px`);
    document.startViewTransition(flip);
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
