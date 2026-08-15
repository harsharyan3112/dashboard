import { Activity, Project } from "./types";

export const stats = {
  revenue: 1840000,
  revenueChange: 14.8,
  projects: 24,
  projectChange: 8.2,
  customers: 1284,
  customerChange: 12.1,
  completion: 87.4,
};

export const revenueData = [
  { month: "Jan", revenue: 920000, projects: 11 },
  { month: "Feb", revenue: 1080000, projects: 14 },
  { month: "Mar", revenue: 990000, projects: 13 },
  { month: "Apr", revenue: 1260000, projects: 17 },
  { month: "May", revenue: 1420000, projects: 20 },
  { month: "Jun", revenue: 1580000, projects: 21 },
  { month: "Jul", revenue: 1710000, projects: 23 },
  { month: "Aug", revenue: 1840000, projects: 24 },
];

export const projects: Project[] = [
  { id: 1, name: "Enterprise Portal", client: "Northstar Labs", status: "On Track", progress: 82, budget: 420000, deadline: "Sep 12, 2026" },
  { id: 2, name: "Mobile Commerce App", client: "UrbanCart", status: "At Risk", progress: 64, budget: 680000, deadline: "Oct 04, 2026" },
  { id: 3, name: "Automation Suite", client: "FinEdge", status: "On Track", progress: 91, budget: 310000, deadline: "Aug 28, 2026" },
  { id: 4, name: "Analytics Platform", client: "Vertex Systems", status: "Completed", progress: 100, budget: 540000, deadline: "Aug 02, 2026" },
];

export const activities: Activity[] = [
  { id: 1, text: "Automation Suite reached 91% completion", time: "8 min ago", type: "project" },
  { id: 2, text: "Neha joined the product team", time: "34 min ago", type: "team" },
  { id: 3, text: "Monthly analytics report generated", time: "1 hr ago", type: "system" },
  { id: 4, text: "₹1.8L payment recorded from Northstar Labs", time: "2 hrs ago", type: "payment" },
  { id: 5, text: "Mobile Commerce App marked at risk", time: "4 hrs ago", type: "project" },
];