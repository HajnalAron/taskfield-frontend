import React from "react";
import { Task } from "../../features/tasks/Task";
import TaskCard from "./TaskCard";
import TaskListItem from "./TaskListItem";
import "./TaskItem.css";

interface TaskItemProps {
  taskData: Task;
  view: "list" | "card";
}

export default function TaskItem({ taskData, view }: TaskItemProps) {
  return (
    <>
      <div>
        {taskData && view === "list" && <TaskListItem taskData={taskData} />}
      </div>
      <div>
        {taskData && view === "card" && <TaskCard taskData={taskData} />}
      </div>
    </>
  );
}
