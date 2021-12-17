import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setActiveWorkSpace } from "../../features/user/userSlice";
import ClientOrganizations from "./ClientOrganizations";
import ClientTaskList from "./ClientTaskList";
import ClientWorkspaces from "./ClientWorkspaces";
import "./DashBoard.css";

export default function DashBoard() {
  const dispatch = useAppDispatch();

  const clientOrganizations = useAppSelector(
    (state) => state.organizationsSlice
  );

  const user = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(setActiveWorkSpace(0));
  }, []);

  return (
    <div className="w-100">
      <h1 className="text-center">
        {user.userData.firstname} {user.userData.surname + "'s Dashboard"}
      </h1>
      <Container className="w-100" fluid>
        <Row>
          <Col className="dashboardSmallContainer" xs={6}>
            <h4> Workspaces </h4>
            <ClientWorkspaces />
          </Col>
          <Col className="dashboardSmallContainer" xs={6}>
            <h4>Organizations</h4>
            <ClientOrganizations />
          </Col>
          <Col xs={12}>
            <ClientTaskList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
