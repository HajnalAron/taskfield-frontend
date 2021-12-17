import { User } from "../user/User";

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
  categories?: Category[];
}

interface Category {
  id: number;
  text: string;
  color: string;
  taskId: string;
}
export interface TaskComment {
  id: number;
  text: string;
  media?: string;
  createdAt: Date;
  taskId: number;
  userId: number;
  user: User;
}

export interface TaskAttachment {
  id: number;
  link: string;
  taskId: string;
}
