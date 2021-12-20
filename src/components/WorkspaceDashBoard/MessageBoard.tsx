import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { socket } from "../../features/socket";
import { Message } from "../../features/user/userSlice";
import SingleMessage from "./SingleMessage";

export default function MessageBoard() {
  const messages = useAppSelector(
    (state) => state.userSlice.activeWorkspaceMessages
  );

  const [newMessageText, setNewMessageText] = useState<string>("");

  const clientData = useAppSelector((state) => state.userSlice);

  const sendMessage = () => {
    socket.emit("outgoing-message", {
      text: newMessageText,
      workspaceId: clientData.activeWorkspace,
      userId: clientData.userData.id
    });
  };

  return (
    <div>
      <div className="messageArea">
        {messages ? (
          messages.map((m) => <SingleMessage key={m.id} messageData={m} />)
        ) : (
          <div>No message found</div>
        )}
      </div>
      <InputGroup className="my-4">
        <FormControl
          value={newMessageText}
          onChange={(e) => {
            setNewMessageText(e.target.value);
          }}
          type={"text"}
          placeholder="Type your message here"
          aria-label="New message"
          aria-describedby="basic-addon2"
        />
        <Button
          onClick={() => sendMessage()}
          variant="outline-secondary"
          id="button-addon2"
        >
          Send message
        </Button>
      </InputGroup>
    </div>
  );
}
