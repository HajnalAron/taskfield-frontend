import React from "react";
import { Task } from "../../features/tasks/Task";
import { useDrag } from "react-dnd";
import { ListGroupItem } from "react-bootstrap";

interface TaskListItemProps {
  taskData: Task;
}

export default function TaskListItem({ taskData }: TaskListItemProps) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: "TaskListItem",
    item: { id: taskData.id }
  }));
  return (
    <ListGroupItem>
      <span>{taskData.name}</span>
      <span>{taskData.active}</span>
      <span>{taskData.status}</span>
      <span>{taskData.priority}</span>
      <span>{taskData.summary}</span>
      <span>{taskData.due}</span>
      <span>{taskData.estimate}</span>
    </ListGroupItem>
  );
}
