import Link from "next/link";
import { Dumbbell } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/25">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Dumbbell className="size-4" />
          </span>
          <span className="font-black uppercase tracking-widest">
            Pulse<span className="text-primary">Fit</span>
          </span>
        </Link>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} PulseFit Gym. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
