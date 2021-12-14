import React from "react";
import { ListGroup } from "react-bootstrap";
import { Task } from "../../features/tasks/Task";
import TaskCard from "./TaskCard";
import TaskListItem from "./TaskListItem";

interface TaskProps {
  taskData: Task;
  view: "list" | "card";
}

export default function Task({ taskData, view }: TaskProps) {
  return (
    <>
      <ListGroup>
        {taskData && view === "list" && <TaskListItem taskData={taskData} />}
      </ListGroup>
      <div>
        {taskData && view === "card" && <TaskCard taskData={taskData} />}
      </div>
    </>
  );
}
