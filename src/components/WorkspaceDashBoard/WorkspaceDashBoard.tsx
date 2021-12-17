import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { store } from "../../app/store";
import { Task } from "../../features/tasks/Task";
import {
  getActiveWorkspaceTasks,
  setActiveWorkSpace
} from "../../features/user/userSlice";

export default function WorkspaceDashBoard() {
  let workspaceId = useParams().workspaceId;
  const dispatch = useAppDispatch();
  const workSpaceTasks = useAppSelector(
    (state) => state.userSlice.activeWorkspaceTasks
  );

  useEffect(() => {
    dispatch(setActiveWorkSpace(parseInt(workspaceId!)));
  }, []);

  useEffect(() => {
    store.dispatch(getActiveWorkspaceTasks());
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
