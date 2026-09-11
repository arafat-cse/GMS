import type { Metadata } from "next";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";

import { publicApi } from "@/lib/api";
import type { MembershipPlan } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SectionHeading } from "@/components/site/section-heading";
import { PricingCard } from "@/components/site/pricing-card";

export const metadata: Metadata = {
  title: "Membership Plans — PulseFit Gym",
  description:
    "Simple, transparent gym membership plans. No hidden fees, no long contracts — pick the plan that fits your grind.",
};

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const plans = await publicApi<MembershipPlan[]>("/plans");

  const highlightedIndex =
    plans && plans.length >= 3 ? 1 : plans && plans.length > 0 ? 0 : -1;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section id="plans" className="relative overflow-hidden py-16 sm:py-24">
          <div className="absolute top-[-10%] left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
          <div className="container grid gap-14">
            <SectionHeading
              eyebrow="Membership Plans"
              title="Pick the plan that fits your grind"
              description="Simple, transparent pricing — no hidden fees, no long contracts. Upgrade or switch anytime."
            />

            {plans === null ? (
              <p className="mx-auto max-w-md rounded-2xl border border-border/60 bg-card/40 px-6 py-8 text-center text-sm text-muted-foreground">
                We couldn&apos;t load our plans right now. Please try again in a
                few minutes.
              </p>
            ) : plans.length === 0 ? (
              <p className="mx-auto max-w-md rounded-2xl border border-border/60 bg-card/40 px-6 py-8 text-center text-sm text-muted-foreground">
                Plans are being updated — check back shortly.
              </p>
            ) : (
              <div
                className={
                  plans.length === 1
                    ? "grid gap-6 md:grid-cols-2 lg:mx-auto lg:max-w-md lg:grid-cols-1"
                    : plans.length === 2
                      ? "grid items-center gap-6 md:grid-cols-2 lg:max-w-2xl lg:mx-auto"
                      : "grid items-center gap-6 md:grid-cols-2 lg:grid-cols-3"
                }
              >
                {plans.map((plan, i) => (
                  <PricingCard
                    key={plan.id}
                    plan={plan}
                    highlighted={i === highlightedIndex}
                  />
                ))}
              </div>
            )}

            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                All plans include locker access & free WiFi
              </p>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden border-t border-border/40 bg-card/25 py-16 sm:py-20"
        >
          <div className="container grid items-center gap-12 lg:grid-cols-2">
            <div className="grid max-w-2xl gap-5 lg:max-w-none">
              <Badge className="w-fit">Get Started</Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                Ready to join PulseFit?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Drop by the front desk or give us a call — we&apos;ll match you
                with the right plan and get you moving the same day.
              </p>
              <div>
                <Link
                  href="/pricing#plans"
                  className={
                    buttonVariants({ size: "lg" }) +
                    " font-bold uppercase tracking-wider text-xs"
                  }
                >
                  See Plans <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Sector 7, Uttara, Dhaka 1230",
                },
                {
                  icon: Clock,
                  label: "Open Hours",
                  value: "Sat–Thu: 6:00 AM – 11:00 PM · Fri: 3:00 PM – 11:00 PM",
                },
                {
                  icon: Phone,
                  label: "Call Us",
                  value: "+880 1700-000000",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-card glow-hover flex items-center gap-4 rounded-2xl border border-border/60 p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
