import { LayoutDashboard, Building2, Users, type LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const adminNav: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Branches", href: "/branches", icon: Building2 },
  { title: "Members", href: "/members", icon: Users },
];
