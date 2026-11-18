"use client";

import { type ReactNode, useState } from "react";

import { cn } from "cn";

import { Card } from "@/components/ui/card";

/** Labels and panels are rendered on the server; this only tracks which one is active. */
export type TreeNode = {
  id: string;
  branch: boolean;
  label: ReactNode;
  panel: ReactNode;
};

const fade = "transition-colors duration-300";
const lit = (on: boolean) => (on ? "bg-primary" : "bg-foreground/15");
const panelMotion =
  "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1 motion-safe:duration-300";
// Hover only previews where the panel sits beside the tree (Tailwind `lg`). Below that
// the detail opens inline, so hover would shift the list under the cursor.
const wide = () => matchMedia("(min-width: 64rem)").matches;

export function ExperienceTree({ nodes }: { nodes: TreeNode[] }) {
  const [a, setActive] = useState(0);
  // Company node the active branch hangs off; the path from it to `a` lights up.
  const rs = nodes.findLastIndex((n, i) => i <= a && !n.branch);

  return (
    <div className="items-start lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
      <ol aria-label="Career tree" className="isolate">
        {nodes.map((node, i) => {
          const active = i === a;
          const activate = () => setActive(i);
          return (
            <li
              key={node.id}
              className={cn(
                "relative [--c:1.375rem]",
                !node.branch && i > 0 && "pt-8 [--c:3.375rem]",
              )}
            >
              {/* Trunk: above and below this row's node, drawn over branch curves. */}
              {i > 0 && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-0 left-2.75 z-10 h-(--c) w-0.5",
                    fade,
                    lit(i > rs && i <= a),
                  )}
                />
              )}
              {i < nodes.length - 1 && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-(--c) bottom-0 left-2.75 z-10 w-0.5",
                    fade,
                    lit(i >= rs && i < a),
                  )}
                />
              )}

              <button
                type="button"
                aria-expanded={active}
                aria-controls={`${node.id}-panel`}
                onClick={activate}
                onFocus={activate}
                onPointerEnter={(e) =>
                  e.pointerType === "mouse" && wide() && activate()
                }
                className={cn(
                  "group relative block w-full cursor-pointer rounded-md py-2 text-left outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring",
                  node.branch ? "pl-14" : "pl-10",
                )}
              >
                {node.branch ? (
                  <>
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-0 left-2.75 h-5.5 w-6 rounded-bl-xl border-b-2 border-l-2",
                        fade,
                        active ? "border-primary" : "border-foreground/15",
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-4.25 left-8.5 size-2.5 rounded-full border-2 transition-all duration-300",
                        active
                          ? "scale-125 border-primary bg-primary"
                          : "border-foreground/30 bg-background group-hover:border-primary",
                      )}
                    />
                    <span
                      className={cn(
                        "block leading-7 font-medium",
                        fade,
                        active
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {node.label}
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-2.5 left-0 z-20 grid size-6 place-items-center rounded-full border-2 bg-background",
                        fade,
                        active || i === rs
                          ? "border-primary"
                          : "border-foreground/25",
                      )}
                    >
                      {/* Current role. */}
                      {i === 0 && (
                        <span className="size-2.5 rounded-full bg-primary" />
                      )}
                    </span>
                    {node.label}
                  </>
                )}
              </button>

              {active && (
                <Card
                  className={cn("mt-2 mb-4 ml-6 p-5 lg:hidden", panelMotion)}
                >
                  {node.panel}
                </Card>
              )}
            </li>
          );
        })}
      </ol>

      {/* Every panel stays in the HTML so the content is indexable. They share one grid
          cell, so the column is as tall as the longest and switching never resizes the page. */}
      <div className="hidden lg:grid lg:self-stretch">
        {nodes.map((node, i) => (
          <Card
            key={node.id}
            id={`${node.id}-panel`}
            className={cn(
              "sticky top-24 self-start p-8 [grid-area:1/1]",
              i === a ? panelMotion : "invisible",
            )}
          >
            {node.panel}
          </Card>
        ))}
      </div>
    </div>
  );
}
