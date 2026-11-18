import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-4 text-center">
      <div className="space-y-4">
        <p className="font-semibold text-primary">404</p>
        <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground">
          This page doesn&apos;t exist or has moved.
        </p>
        <Button asChild size="lg">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
