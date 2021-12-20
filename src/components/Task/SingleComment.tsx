import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { User } from "../../features/user/User";
import "./SingleComment.css";

interface SingleCommentProps {
  commentData: {
    id: number;
    text: string;
    media?: string;
    createdAt: Date;
    taskId: number;
    userId: number;
    user: User;
  };
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function SingleComment({
  commentData,
  setLoading
}: SingleCommentProps) {
  const user = useAppSelector((state) => state.userSlice);

  const deleteComment = async () => {
    try {
      const request = await axios.delete(
        import.meta.env.VITE_APP_BACKEND_URL +
          `/comments/${commentData.taskId}/${commentData.id}`
      );
      if (request.status === 204) {
        setLoading(true);
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="d-flex flex-column mt-2">
        <div className="comment">{commentData.text}</div>
        <div className="d-flex mt-2">
          <img
            src={commentData.user.avatar}
            className="rounded-circle mr-2"
            width="24px"
            alt=""
          />
          <div>
            {commentData.user.firstname} {commentData.user.surname}
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div style={{ fontSize: "12px", marginLeft: "8px" }}>
              {new Date(commentData.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            {commentData.user.id === user.userData.id ? (
              <div className="d-flex">
                <div
                  onClick={() => {
                    deleteComment();
                  }}
                  style={{
                    fontSize: "12px",
                    marginLeft: "8px"
                  }}
                >
                  Delete
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    marginLeft: "8px"
                  }}
                >
                  Edit
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
