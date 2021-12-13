import React from "react";
import { Task } from "../../features/tasks/Task";

interface TaskProps {
  taskData: Task;
  view: "list" | "card";
}

export default function Task({ taskData, view }: TaskProps) {
  return <div></div>;
}
