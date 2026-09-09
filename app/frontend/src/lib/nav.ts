import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  ClipboardList,
  Wallet,
  Smartphone,
  Ticket,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const adminNav: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Branches", href: "/branches", icon: Building2 },
  { title: "Members", href: "/members", icon: Users },
  { title: "Plans", href: "/plans", icon: CreditCard },
  { title: "Subscriptions", href: "/subscriptions", icon: ClipboardList },
  { title: "Payments", href: "/payments", icon: Wallet },
  { title: "Payment Numbers", href: "/payment-numbers", icon: Smartphone },
  { title: "Coupons", href: "/coupons", icon: Ticket },
];
