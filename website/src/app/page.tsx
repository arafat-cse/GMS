import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CalendarCheck, Sparkles, Star } from "lucide-react";

import { publicApi } from "@/lib/api";
import type { MembershipPlan, Trainer } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SectionHeading } from "@/components/site/section-heading";
import { PricingCard } from "@/components/site/pricing-card";
import { TrainerCard } from "@/components/site/trainer-card";

export const metadata: Metadata = {
  title: "PulseFit Gym — Train Smarter. Live Stronger.",
  description:
    "Elite personal coaching, state-of-the-art training spaces, and simple membership plans — everything you need to stay consistent.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [plans, trainers] = await Promise.all([
    publicApi<MembershipPlan[]>("/plans"),
    publicApi<Trainer[]>("/trainers"),
  ]);

  const previewPlans = (plans ?? []).slice(0, 3);
  const previewTrainers = (trainers ?? []).slice(0, 4);
  const planCount = plans?.length ?? 0;
  const trainerCount = trainers?.length ?? 0;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
          <div className="absolute top-[10%] left-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[130px]" />
          <div className="absolute top-[40%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />

          <div className="container grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 grid gap-6 text-left">
              <Badge className="w-fit">
                <Sparkles className="size-3 animate-pulse" />
                Now enrolling for{" "}
                {new Date().toLocaleString("en-US", { month: "long" })}
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-balance">
                Train <span className="text-primary text-glow font-black">smarter.</span>
                <br />
                Live <span className="text-primary text-glow font-black">stronger.</span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                PulseFit combines elite personal coaching, state-of-the-art
                training spaces, and a results-driven community to help you
                achieve your ultimate fitness goals.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/register"
                  className={
                    buttonVariants({ size: "lg" }) +
                    " px-8 font-bold uppercase tracking-wider text-xs py-6"
                  }
                >
                  Get Started Now <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/pricing"
                  className={
                    buttonVariants({ variant: "secondary", size: "lg" }) +
                    " px-8 font-bold uppercase tracking-wider text-xs py-6"
                  }
                >
                  Explore Plans
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-border/40 mt-4">
                {trainerCount > 0 ? (
                  <>
                    <div>
                      <p className="text-3xl font-black text-glow">
                        {trainerCount}+
                      </p>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-0.5">
                        Elite Coaches
                      </p>
                    </div>
                    <div className="hidden sm:block h-10 w-px bg-border/40" />
                  </>
                ) : null}
                <div>
                  <p className="text-3xl font-black text-glow">{planCount}</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-0.5">
                    Flexible Tiers
                  </p>
                </div>
                <div className="hidden sm:block h-10 w-px bg-border/40" />
                <div>
                  <p className="flex items-center gap-1.5 text-3xl font-black text-glow">
                    4.9 <Star className="size-5 fill-primary text-primary" />
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-0.5">
                    Member Rating
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-primary to-primary/40 opacity-20 blur-2xl -z-10" />
              <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-2xl bg-card">
                <Image
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=900&h=1100"
                  alt="Athlete training at PulseFit Gym"
                  width={900}
                  height={1100}
                  priority
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent" />
              </div>

              <Card className="absolute -bottom-6 -left-6 hidden w-64 shadow-2xl border-primary/20 glass-card sm:block z-10">
                <CardContent className="flex items-center gap-3.5 p-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
                    <CalendarCheck className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Pulse Session
                    </p>
                    <p className="text-sm font-bold">Next class: Today, 6:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        {/* <section className="border-y border-border/40 bg-card/20 py-20 relative">
          <div className="container grid gap-12">
            <SectionHeading
              eyebrow="Why PulseFit"
              title="Everything you need to stay consistent"
              description="We remove the friction between you and your workout — good equipment, real coaching, and a schedule that bends to your life."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <Card
                  key={feature.title}
                  className="glass-card glow-hover border-border/40"
                >
                  <CardContent className="grid gap-3 pt-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <feature.icon className="size-5" />
                    </div>
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing preview */}
        <section className="py-20 relative">
          <div className="container grid gap-12">
            <SectionHeading
              eyebrow="Membership"
              title="Simple plans, no surprises"
              description="Pick a plan that matches your goals. Switch or cancel anytime."
            />
            {previewPlans.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-center">
                {previewPlans.map((plan, i) => (
                  <PricingCard key={plan.id} plan={plan} highlighted={i === 1} />
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                Plans are being updated — check back shortly.
              </p>
            )}
            <div className="flex justify-center mt-4">
              <Link
                href="/pricing"
                className={
                  buttonVariants({ variant: "outline" }) +
                  " font-bold uppercase tracking-wider text-xs px-6 py-5"
                }
              >
                See all plans <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Team preview */}
        {trainerCount > 0 ? (
          <section className="border-t border-border/40 bg-card/20 py-20 relative">
            <div className="container grid gap-12">
              <SectionHeading
                eyebrow="Our Team"
                title="Coaches who actually coach"
                description="Certified trainers across strength, yoga, and functional fitness — ready to build a plan around you."
              />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {previewTrainers.map((trainer) => (
                  <TrainerCard key={trainer.id} trainer={trainer} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* CTA */}
        {/* <section className="pb-20 relative">
          <div className="container">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card to-card/60 border border-border p-8 md:p-14 text-center shadow-2xl">
              <div className="absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />
              <div className="absolute top-0 left-0 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-[80px]" />

              <div className="relative z-10 max-w-2xl mx-auto grid gap-6">
                <Badge className="mx-auto w-fit">Join the PulseFit Tribe</Badge>
                <h2 className="text-3xl font-extrabold sm:text-5xl tracking-tight">
                  Ready to start your journey?
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Join PulseFit today and get matched with a plan and trainer
                  that fits your goals — no long-term contracts.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Link
                    href="/register"
                    className={
                      buttonVariants({ size: "lg" }) +
                      " px-8 font-bold uppercase tracking-wider text-xs py-6"
                    }
                  >
                    Join Now <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/pricing#contact"
                    className={
                      buttonVariants({ variant: "outline", size: "lg" }) +
                      " px-8 font-bold uppercase tracking-wider text-xs py-6"
                    }
                  >
                    Talk to Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <SiteFooter />
    </div>
  );
}
