import axios from "axios";
import React, { useEffect, useState } from "react";
import { Task, TaskComment } from "../../features/tasks/Task";
import SingleComment from "./SingleComment";

interface TaskCommentsProps {
  taskData: Task;
}

export default function TaskComments(props: TaskCommentsProps) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [taskComments, setTaskComments] = useState<TaskComment[]>([]);
  const getTaskComments = async (id: number) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "/comments/" + id
      );
      setTaskComments(response.data as TaskComment[]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      getTaskComments(props.taskData.id);
    }
  }, [isLoading]);

  return (
    <div>
      {taskComments ? (
        taskComments.map((c) => <SingleComment commentData={c} />)
      ) : (
        <div>No comments found</div>
      )}
    </div>
  );
}
