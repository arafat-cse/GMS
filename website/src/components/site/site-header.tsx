import Link from "next/link";
import { Dumbbell } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Plans" },
  { href: "/pricing#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="glass-card sticky top-0 z-50 border-b border-border/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
            <Dumbbell className="size-5" />
          </span>
          <span className="text-lg font-black uppercase tracking-widest">
            Pulse<span className="text-primary">Fit</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/register"
            className={
              buttonVariants({ size: "sm" }) +
              " font-bold uppercase tracking-wider"
            }
          >
            Join Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
