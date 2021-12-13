import React from "react";
import { Container, Nav, Offcanvas, Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <div>
      <Navbar bg="light" className="w-100" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">NavBar</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Right SideBar
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1"></Nav.Link>
                <Nav.Link href="#action2"></Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
