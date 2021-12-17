import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Task } from "../../features/tasks/Task";
import { setActiveWorkSpace } from "../../features/user/userSlice";

export default function WorkspaceDashBoard() {
  let workspaceId = useParams().workspaceId;
  const dispatch = useAppDispatch();
  const [workspaceTasks, setWorkspaceTasks] = useState<Task[]>([]);

  useEffect(() => {
    dispatch(setActiveWorkSpace(parseInt(workspaceId!)));
  }, []);

  useEffect(() => {
    const getWorkspaceTasks = async (workspaceId: string) => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_APP_BACKEND_URL +
            "/tasks/workspace/" +
            workspaceId
        );
        setWorkspaceTasks(response.data as Task[]);
      } catch (error) {
        console.log(error);
      }
    };
    getWorkspaceTasks(workspaceId!);
  }, [workspaceId]);

  return (
    <div className="w-100">
      <h1 className="text-center"></h1>
      <Container className="w-100" fluid>
        <Row>
          <Col className="dashboardSmallContainer" xs={6}>
            <h3>Workspace Details</h3>
          </Col>
          <Col className="dashboardSmallContainer" xs={6}>
            <h3>Message Board</h3>
          </Col>
          <Col xs={12}>
            <h3>Tasks</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
