"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Ticket,
  Upload,
} from "lucide-react";

import type { MembershipPlan, PaymentNumber } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  plans: MembershipPlan[];
  paymentNumbers: PaymentNumber[];
  initialPlanId: number | null;
};

type CouponInfo = {
  code: string;
  discount_amount: string | number;
  final_price: string | number;
};

const STEPS = ["Plan", "Your Details", "Payment"] as const;

const money = (n: string | number) => Number(n).toLocaleString("en-US");

const SELECT_CLASS =
  "flex h-10 w-full rounded-lg border border-input bg-background/60 px-3.5 text-sm text-foreground outline-none transition-colors focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/25 [&>option]:bg-card [&>option]:text-foreground";

export function RegisterFlow({ plans, paymentNumbers, initialPlanId }: Props) {
  const hasInitialPlan = plans.some((p) => p.id === initialPlanId);
  const [step, setStep] = useState(hasInitialPlan ? 2 : 1);
  const [planId, setPlanId] = useState<number | null>(
    hasInitialPlan ? (initialPlanId as number) : null
  );

  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    gender: "",
    address: "",
  });
  const [submittingDetails, setSubmittingDetails] = useState(false);
  const [detailErrors, setDetailErrors] = useState<Record<string, string[]>>({});
  const [registrationId, setRegistrationId] = useState<number | null>(null);

  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<CouponInfo | null>(null);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const [method, setMethod] = useState<string>(paymentNumbers[0]?.method ?? "bkash");
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string[]>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedPlan = plans.find((p) => p.id === planId) ?? null;
  const finalAmount = useMemo(() => {
    if (amount !== null) return amount;
    if (coupon) return String(coupon.final_price);
    return selectedPlan ? String(Number(selectedPlan.price)) : "";
  }, [amount, coupon, selectedPlan]);

  if (plans.length === 0) {
    return (
      <p className="mx-auto max-w-md rounded-2xl border border-border/60 bg-card/40 px-6 py-8 text-center text-sm text-muted-foreground">
        Plans are being updated — please check back shortly to register.
      </p>
    );
  }

  async function submitDetails(e: React.FormEvent) {
    e.preventDefault();
    setDetailErrors({});
    if (details.password !== details.password_confirmation) {
      setDetailErrors({
        password_confirmation: ["Password confirmation does not match."],
      });
      return;
    }
    setSubmittingDetails(true);
    try {
      const res = await fetch("/api/public/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: details.first_name,
          last_name: details.last_name,
          email: details.email,
          password: details.password,
          phone: details.phone || null,
          gender: details.gender || null,
          address: details.address || null,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setDetailErrors(data?.errors ?? {});
        return;
      }
      setRegistrationId(data.registration.id);
      setStep(3);
    } finally {
      setSubmittingDetails(false);
    }
  }

  async function applyCoupon() {
    if (!couponInput.trim() || !selectedPlan) return;
    setCouponMsg(null);
    setApplyingCoupon(true);
    try {
      const res = await fetch(
        `/api/public/coupons/validate?code=${encodeURIComponent(couponInput.trim())}&membership_plan_id=${selectedPlan.id}`
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setCoupon(null);
        setCouponMsg(data?.message ?? "This coupon is not valid.");
        return;
      }
      setCoupon({
        code: couponInput.trim(),
        discount_amount: data.discount_amount,
        final_price: data.final_price,
      });
      setAmount(null);
      setCouponMsg("Coupon applied!");
    } finally {
      setApplyingCoupon(false);
    }
  }

  async function submitPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!registrationId || !selectedPlan) return;
    setPaymentErrors({});
    setSubmittingPayment(true);
    try {
      const fd = new FormData();
      fd.append("membership_plan_id", String(selectedPlan.id));
      fd.append("method", method);
      fd.append("sender_number", senderNumber);
      fd.append("transaction_id", transactionId);
      fd.append("amount", finalAmount);
      if (coupon) fd.append("coupon_code", coupon.code);
      if (file) fd.append("screenshot", file);

      const res = await fetch(
        `/api/public/registrations/${registrationId}/payments`,
        { method: "POST", body: fd }
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setPaymentErrors(data?.errors ?? {});
        return;
      }
      setStep(4);
    } finally {
      setSubmittingPayment(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Stepper */}
      {step < 4 ? (
        <ol className="mb-10 flex items-center justify-center gap-2 sm:gap-4">
          {STEPS.map((label, i) => {
            const n = i + 1;
            const active = n === step;
            const done = n < step;
            return (
              <li key={label} className="flex items-center gap-2 sm:gap-4">
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border text-xs font-bold",
                    active && "border-primary bg-primary text-primary-foreground shadow-glow",
                    done && "border-primary/40 bg-primary/15 text-primary",
                    !active && !done && "border-border text-muted-foreground"
                  )}
                >
                  {done ? <Check className="size-4" /> : n}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-bold uppercase tracking-wider sm:block",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
                {n < STEPS.length ? (
                  <span className="h-px w-6 bg-border sm:w-10" aria-hidden />
                ) : null}
              </li>
            );
          })}
        </ol>
      ) : null}

      {/* Step 1: plan */}
      {step === 1 ? (
        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setPlanId(plan.id)}
                className={cn(
                  "glow-hover rounded-2xl border p-5 text-left transition-all",
                  planId === plan.id
                    ? "border-primary/60 bg-primary/10 ring-1 ring-primary/40"
                    : "border-border/60 bg-card/40"
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {plan.name}
                  </p>
                  {planId === plan.id ? (
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" />
                    </span>
                  ) : null}
                </div>
                <p className="pt-2 text-2xl font-black">৳{money(plan.price)}</p>
                <p className="text-xs text-muted-foreground">
                  {plan.duration_in_days} days
                </p>
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              size="lg"
              disabled={!planId}
              onClick={() => setStep(2)}
              className="px-10 font-bold uppercase tracking-wider text-xs"
            >
              Continue <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ) : null}

      {/* Step 2: details */}
      {step === 2 ? (
        <Card className="glass-card border-border/60">
          <CardContent className="grid gap-5 p-6 sm:p-8">
            <form onSubmit={submitDetails} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="First Name"
                  error={detailErrors.first_name?.[0]}
                >
                  <Input
                    required
                    value={details.first_name}
                    onChange={(e) =>
                      setDetails({ ...details, first_name: e.target.value })
                    }
                  />
                </Field>
                <Field
                  label="Last Name"
                  error={detailErrors.last_name?.[0]}
                >
                  <Input
                    required
                    value={details.last_name}
                    onChange={(e) =>
                      setDetails({ ...details, last_name: e.target.value })
                    }
                  />
                </Field>
              </div>
              <Field label="Email" error={detailErrors.email?.[0]}>
                <Input
                  required
                  type="email"
                  value={details.email}
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Password" error={detailErrors.password?.[0]}>
                  <Input
                    required
                    type="password"
                    minLength={6}
                    value={details.password}
                    onChange={(e) =>
                      setDetails({ ...details, password: e.target.value })
                    }
                  />
                </Field>
                <Field
                  label="Confirm Password"
                  error={detailErrors.password_confirmation?.[0]}
                >
                  <Input
                    required
                    type="password"
                    value={details.password_confirmation}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        password_confirmation: e.target.value,
                      })
                    }
                  />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone" error={detailErrors.phone?.[0]}>
                  <Input
                    value={details.phone}
                    onChange={(e) =>
                      setDetails({ ...details, phone: e.target.value })
                    }
                  />
                </Field>
                <Field label="Gender">
                  <select
                    value={details.gender}
                    onChange={(e) =>
                      setDetails({ ...details, gender: e.target.value })
                    }
                    className={SELECT_CLASS}
                  >
                    <option value="">Select (optional)</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
              </div>
              <Field label="Address" error={detailErrors.address?.[0]}>
                <Input
                  value={details.address}
                  onChange={(e) =>
                    setDetails({ ...details, address: e.target.value })
                  }
                />
              </Field>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="size-4" /> Back
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={submittingDetails}
                  className="px-10 font-bold uppercase tracking-wider text-xs"
                >
                  {submittingDetails ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : null}
                  Continue to Payment <ArrowRight className="size-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}

      {/* Step 3: payment */}
      {step === 3 && selectedPlan ? (
        <div className="grid gap-6">
          {/* Summary */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="grid gap-2 p-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-bold">{selectedPlan.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Price</span>
                <span>৳{money(selectedPlan.price)}</span>
              </div>
              {coupon ? (
                <>
                  <div className="flex items-center justify-between text-primary">
                    <span>Discount ({coupon.code})</span>
                    <span>− ৳{money(coupon.discount_amount)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/40 pt-2 text-base">
                    <span className="font-bold">Payable</span>
                    <span className="font-black text-primary">
                      ৳{money(coupon.final_price)}
                    </span>
                  </div>
                </>
              ) : null}
            </CardContent>
          </Card>

          <Card className="glass-card border-border/60">
            <CardContent className="grid gap-5 p-6 sm:p-8">
              {/* Payment numbers */}
              {paymentNumbers.length > 0 ? (
                <div className="grid gap-3">
                  <Label>Send money to</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {paymentNumbers.map((pn) => (
                      <div
                        key={pn.id}
                        className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-4"
                      >
                        <Badge variant="secondary" className="capitalize">
                          {pn.method}
                        </Badge>
                        <div>
                          <p className="text-sm font-bold">{pn.number}</p>
                          {pn.label ? (
                            <p className="text-xs text-muted-foreground">
                              {pn.label}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <form onSubmit={submitPayment} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Payment Method" error={paymentErrors.method?.[0]}>
                    <select
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                      className={SELECT_CLASS}
                    >
                      {(paymentNumbers.length > 0
                        ? Array.from(new Set(paymentNumbers.map((p) => p.method)))
                        : ["bkash", "nagad"]
                      ).map((m) => (
                        <option key={m} value={m} className="capitalize">
                          {m}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="Sender Number"
                    error={paymentErrors.sender_number?.[0]}
                  >
                    <Input
                      required
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      placeholder="01XXXXXXXXX"
                    />
                  </Field>
                </div>
                <Field
                  label="Transaction ID"
                  error={paymentErrors.transaction_id?.[0]}
                >
                  <Input
                    required
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. 9GX7K2LM"
                  />
                </Field>

                {/* Coupon */}
                <div className="grid gap-2">
                  <Label>Coupon Code</Label>
                  <div className="flex gap-2">
                    <Input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Have a coupon?"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={applyingCoupon || !couponInput.trim()}
                      onClick={applyCoupon}
                    >
                      {applyingCoupon ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Ticket className="size-4" />
                      )}
                      Apply
                    </Button>
                  </div>
                  {couponMsg ? (
                    <p
                      className={cn(
                        "text-xs font-semibold",
                        coupon ? "text-primary" : "text-destructive"
                      )}
                    >
                      {couponMsg}
                    </p>
                  ) : null}
                  {paymentErrors.coupon_code?.[0] ? (
                    <p className="text-xs font-semibold text-destructive">
                      {paymentErrors.coupon_code[0]}
                    </p>
                  ) : null}
                </div>

                <Field label="Amount (৳)" error={paymentErrors.amount?.[0]}>
                  <Input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={finalAmount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Field>

                <Field
                  label="Screenshot (optional)"
                  error={paymentErrors.screenshot?.[0]}
                >
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex h-10 w-full items-center gap-2 rounded-lg border border-input bg-background/60 px-3.5 text-sm text-muted-foreground transition-colors hover:border-primary/40"
                  >
                    <Upload className="size-4" />
                    {file ? file.name : "Upload payment proof"}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                </Field>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(2)}
                  >
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submittingPayment}
                    className="px-10 font-bold uppercase tracking-wider text-xs"
                  >
                    {submittingPayment ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : null}
                    Submit Registration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Step 4: success */}
      {step === 4 ? (
        <Card className="mx-auto max-w-lg border-primary/30 text-center">
          <CardContent className="grid gap-4 p-8 sm:p-10">
            <CheckCircle2 className="mx-auto size-14 text-primary" />
            <h2 className="text-2xl font-extrabold">You&apos;re almost in!</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your registration and payment have been submitted
              {selectedPlan ? ` for the ${selectedPlan.name} plan` : ""}. Our
              team will verify the payment and approve your membership shortly
              — you&apos;ll be able to log in once approved.
            </p>
            <div className="flex justify-center pt-2">
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "font-bold uppercase tracking-wider text-xs"
                )}
              >
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
      {error ? (
        <p className="text-xs font-semibold text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
