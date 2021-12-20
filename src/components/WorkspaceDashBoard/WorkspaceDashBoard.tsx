import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { workerData } from "worker_threads";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { store } from "../../app/store";
import { socket } from "../../features/socket";
import { Task } from "../../features/tasks/Task";
import { User } from "../../features/user/User";
import {
  getActiveWorkspaceMessages,
  getActiveWorkspaceTasks,
  setActiveWorkSpace
} from "../../features/user/userSlice";
import { Workspace } from "../../features/workspaces/Workspace";
import NewTask from "../Task/NewTask";
import TaskItem from "../Task/TaskItem";
import MessageBoard from "./MessageBoard";

export default function WorkspaceDashBoard() {
  let workspaceId = useParams().workspaceId;
  const dispatch = useAppDispatch();
  const workSpaceTasks = useAppSelector(
    (state) => state.userSlice.activeWorkspaceTasks
  );
  const [workspaceMembers, setWorkspaceMembers] = useState<User[]>();
  const [workspaceData, setWorkspaceData] = useState<Workspace>();

  const getWorkspaceMembers = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL +
          "/workspaces/users/" +
          workspaceId
      );
      if (response.status === 200) {
        setWorkspaceMembers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWorkSpaceData = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "/workspaces/" + workspaceId
      );
      if (response.status === 200) {
        setWorkspaceData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setActiveWorkSpace(parseInt(workspaceId!)));
    store.dispatch(getActiveWorkspaceMessages(parseInt(workspaceId!)));
    socket.connect();
    socket.emit("join-workspace", parseInt(workspaceId!));
    socket.on("incoming-message", () => {
      store.dispatch(getActiveWorkspaceMessages(parseInt(workspaceId!)));
    });

    return () => {
      socket.emit("leave-workspace", parseInt(workspaceId!));
      socket.removeListener("incoming-message");
    };
  }, []);

  useEffect(() => {
    getWorkSpaceData();
    getWorkspaceMembers();
    store.dispatch(getActiveWorkspaceTasks(1));
  }, [workspaceId]);

  return (
    <div className="w-100">
      <h1 className="text-center"></h1>
      <h1 className="fw-bold">{workspaceData?.name}</h1>
      <Container className="w-100" fluid>
        <Row>
          <Col
            className="dashboardSmallContainer d-flex justify-content-center"
            xs={6}
          >
            <h3>Workspace Details</h3>

            <img src={workspaceData?.logo} />
            <div>
              <div className="fw-bold">Members:</div>
              {workspaceMembers?.map((member) => (
                <div className="m-3">
                  <img src={member.avatar} />
                  <div>
                    {member.surname} {member.firstname}
                  </div>
                  <div>{member.email}</div>
                  <Button>Contact</Button>
                </div>
              ))}
            </div>
          </Col>
          <Col className="dashboardSmallContainer" xs={6}>
            <h3>Message Board</h3>
            <MessageBoard />
          </Col>
          <Col xs={12}>
            <div className="d-flex justify-content-between mb-3">
              <h3>Tasks</h3>
              {workspaceData && <NewTask workspaceData={workspaceData!} />}
            </div>
            <div>
              {workSpaceTasks ? (
                workSpaceTasks.map((t) => (
                  <TaskItem key={t.id} taskData={t} view="list" />
                ))
              ) : (
                <div>No task found for this workspace</div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
