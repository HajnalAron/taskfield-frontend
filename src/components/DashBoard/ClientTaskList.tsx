import React, { useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import Task from "../Task/Task";

export default function ClientTaskList() {
  const clientTasks = useAppSelector((state) => state.tasksSlice);
  return (
    <div>
      {clientTasks.isTasksLoading ? (
        <Spinner animation="border" variant="success" />
      ) : clientTasks.tasksError ? (
        <Alert variant="danger">An error has occurred, try again later!</Alert>
      ) : clientTasks.tasks ? (
        clientTasks.tasks.map((task) => <Task taskData={task} view="list" />)
      ) : (
        <div>No task found!</div>
      )}
    </div>
  );
}
