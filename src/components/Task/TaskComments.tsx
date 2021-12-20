import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { Task, TaskComment } from "../../features/tasks/Task";
import SingleComment from "./SingleComment";

interface TaskCommentsProps {
  taskData: Task;
}

export default function TaskComments(props: TaskCommentsProps) {
  const userId = useAppSelector((state) => state.userSlice.userData.id);
  const [commentText, setCommentText] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [taskComments, setTaskComments] = useState<TaskComment[]>([]);

  const sendComment = async () => {
    try {
      const request = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "/comments/" + props.taskData.id,
        {
          text: commentText,
          userId
        }
      );
      if (request.status === 201) {
        setLoading(true);
        setCommentText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        taskComments.map((c) => (
          <SingleComment
            setLoading={() => setLoading(true)}
            key={c.id}
            commentData={c}
          />
        ))
      ) : (
        <div>No comments found</div>
      )}
      <InputGroup className="my-4">
        <FormControl
          value={commentText}
          type={"text"}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
          placeholder="Type your comment here"
          aria-label="New comment"
          aria-describedby="basic-addon2"
        />
        <Button
          onClick={() => {
            sendComment();
          }}
          variant="outline-secondary"
          id="button-addon2"
        >
          Send comment
        </Button>
      </InputGroup>
    </div>
  );
}
