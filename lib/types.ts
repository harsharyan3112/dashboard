export type ProjectStatus = "On Track" | "At Risk" | "Completed";

export type Project = {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  deadline: string;
};

export type Activity = {
  id: number;
  text: string;
  time: string;
  type: "project" | "team" | "system" | "payment";
};