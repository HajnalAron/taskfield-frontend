export interface Task {
  id: number;
  workspaceId: number;
  name: string;
  summary: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "TO DO" | "IN PROGRESS" | "IN REVEIW" | "DONE";
  active: "open" | "closed";
  estimate: string;
  due: Date;
}
