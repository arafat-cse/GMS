export type MembershipPlan = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  duration_in_days: number;
  features: string[] | null;
};
