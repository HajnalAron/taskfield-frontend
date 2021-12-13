import React from "react";
import { Task } from "../../features/tasks/Task";
import { useDrag } from "react-dnd";

interface TaskListItemProps {
  taskData: Task;
}

export default function TaskListItem({ taskData }: TaskListItemProps) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "TaskListItem",
    item: { id: taskData.id }
  }));
  return <div></div>;
}
