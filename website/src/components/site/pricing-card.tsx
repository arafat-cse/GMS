import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import type { MembershipPlan } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DURATION_LABELS: Record<number, string> = {
  7: "per week",
  30: "per month",
  90: "per quarter",
  180: "per 6 months",
  365: "per year",
};

type PricingCardProps = {
  plan: MembershipPlan;
  highlighted?: boolean;
};

export function PricingCard({ plan, highlighted = false }: PricingCardProps) {
  const durationLabel =
    DURATION_LABELS[plan.duration_in_days] ??
    `for ${plan.duration_in_days} days`;
  const price = Number(plan.price).toLocaleString("en-US");

  return (
    <Card
      className={cn(
        "glow-hover relative flex h-full flex-col",
        highlighted &&
          "border-primary/60 shadow-glow ring-1 ring-primary/40 md:-translate-y-3"
      )}
    >
      {highlighted ? (
        <Badge className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      ) : null}
      <CardHeader className="items-center pb-2 text-center">
        <CardTitle className="text-lg uppercase tracking-widest text-muted-foreground">
          {plan.name}
        </CardTitle>
        <p className="pt-2">
          <span className="text-4xl font-black tracking-tight">
            ৳{price}
          </span>
        </p>
        <CardDescription>{durationLabel}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6">
        {plan.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {plan.description}
          </p>
        ) : null}
        {plan.features && plan.features.length > 0 ? (
          <ul className="grid gap-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3" />
                </span>
                <span className="text-foreground/90">{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
      <CardFooter className="justify-center">
        <Link
          href={`/register?plan=${plan.id}`}
          className={cn(
            buttonVariants({
              variant: highlighted ? "default" : "outline",
              size: "lg",
            }),
            "w-full font-bold uppercase tracking-wider text-xs"
          )}
        >
          Get Started <ArrowRight className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
