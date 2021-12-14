import React from "react";
import { Task } from "../../features/tasks/Task";
import TaskCard from "./TaskCard";
import TaskListItem from "./TaskListItem";
import "./taskItem.css";

interface TaskProps {
  taskData: Task;
  view: "list" | "card";
}

export default function TaskItem({ taskData, view }: TaskProps) {
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
