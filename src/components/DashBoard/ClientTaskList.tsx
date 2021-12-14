import React, { useEffect } from "react";
import { Alert, ListGroup, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { store } from "../../app/store";
import { getClientTasks } from "../../features/tasks/tasksSlice";
import TaskItem from "../Task/TaskItem";

export default function ClientTaskList() {
  const clientTasks = useAppSelector((state) => state.tasksSlice);
  useEffect(() => {
    store.dispatch(getClientTasks());
  }, []);
  return (
    <div>
      {clientTasks.isTasksLoading ? (
        <Spinner animation="border" variant="success" />
      ) : clientTasks.tasksError ? (
        <Alert variant="danger">An error has occurred, try again later!</Alert>
      ) : clientTasks.tasks ? (
        <ListGroup>
          {clientTasks.tasks.map((task) => (
            <TaskItem key={task.id} taskData={task} view="list" />
          ))}
        </ListGroup>
      ) : (
        <div>No task found!</div>
      )}
    </div>
  );
}
