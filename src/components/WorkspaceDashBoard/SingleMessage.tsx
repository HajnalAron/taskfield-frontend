import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Message } from "../../features/user/userSlice";
import "./Message.css";

interface SingleMessageProps {
  messageData: Message;
}

export default function SingleMessage({ messageData }: SingleMessageProps) {
  const clientUserId = useAppSelector((state) => state.userSlice.userData.id);
  const isMyMessage = messageData.userId == clientUserId;
  return (
    <div>
      {!isMyMessage ? (
        <div className="myMessage">
          <div
            className="mb-2 d-flex align-items-center"
            style={{ gap: "8px" }}
          >
            <img src={messageData.user.avatar} width={"32px"} />
            <div>
              {messageData.user.surname} {messageData.user.firstname}
            </div>
          </div>
          <div> {messageData.text} </div>
          <div className="date">
            {new Date(messageData.createdAt).toLocaleString()}
          </div>
        </div>
      ) : (
        <div className="notMyMessage">
          <div
            className="mb-2 d-flex align-items-center"
            style={{ gap: "8px" }}
          >
            <img src={messageData.user.avatar} width={"32px"} />
          </div>
          <div>{messageData.text}</div>
          <div className="date">
            {new Date(messageData.createdAt).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
