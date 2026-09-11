import type { Trainer } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  const initials = trainer.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="glow-hover border-border/40">
      <CardContent className="grid gap-4 pt-6 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-lg font-black text-primary">
          {initials || "PF"}
        </div>
        <div>
          <p className="font-bold">{trainer.name}</p>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {trainer.designation || "Fitness Coach"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
