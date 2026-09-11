import type { Metadata } from "next";

import { publicApi } from "@/lib/api";
import type { MembershipPlan, PaymentNumber } from "@/lib/types";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { RegisterFlow } from "@/components/site/register-flow";

export const metadata: Metadata = {
  title: "Join PulseFit — Register",
  description:
    "Register for PulseFit Gym membership. Pick a plan, submit your details, and pay online — we'll approve you shortly.",
};

export const dynamic = "force-dynamic";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const initialPlanId = Number(searchParams.plan) || null;

  const [plans, paymentNumbers] = await Promise.all([
    publicApi<MembershipPlan[]>("/plans"),
    publicApi<PaymentNumber[]>("/payment-numbers"),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="relative flex-1 overflow-hidden py-14 sm:py-20">
        <div className="absolute top-[-10%] left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="container">
          <div className="mx-auto mb-10 grid max-w-2xl gap-3 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Join <span className="text-primary text-glow">PulseFit</span>
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Three quick steps — pick your plan, share your details, and
              submit your payment. We&apos;ll take it from there.
            </p>
          </div>

          <RegisterFlow
            plans={plans ?? []}
            paymentNumbers={paymentNumbers ?? []}
            initialPlanId={initialPlanId}
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
