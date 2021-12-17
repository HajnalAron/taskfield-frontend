import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setActiveWorkSpace } from "../../features/user/userSlice";
import "./DashBoard.css";

export default function DashBoard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveWorkSpace(0));
  }, []);

  return (
    <div className="w-100">
      <h1 className="text-center"></h1>
      <Container className="w-100" fluid>
        <Row>
          <Col className="dashboardSmallContainer" xs={6}></Col>
          <Col className="dashboardSmallContainer" xs={6}></Col>
          <Col xs={12}></Col>
        </Row>
      </Container>
    </div>
  );
}
