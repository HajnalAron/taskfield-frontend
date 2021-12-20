import React from "react";
import { Container, Nav, Offcanvas, Navbar } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import taskfieldLogo from "../../../assets/taskfield_logo_black.svg";
import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  const activeWorkspace = useAppSelector(
    (state) => state.userSlice.activeWorkspace
  );
  const user = useAppSelector((state) => state.userSlice.userData);
  return (
    <div>
      <Navbar id="navBar" className="w-100 p-0" expand={false}>
        <div className="d-flex w-100 justify-content-between">
          {activeWorkspace !== 0 ? (
            <img
              style={{ visibility: "hidden" }}
              className="align-self-center"
              src={taskfieldLogo}
            />
          ) : (
            <Navbar.Brand href="#">
              <img src={taskfieldLogo} />
            </Navbar.Brand>
          )}
          <>
            {activeWorkspace == 0 ? (
              <div className="d-flex" style={{ gap: "4px" }}>
                <Link
                  className=" d-flex fw-bold navLink justify-content-center align-items-center"
                  style={{ backgroundColor: "#D9F8D7", maxHeight: "64px" }}
                  to="/dashboard"
                >
                  <div className="text-dark navLink">My Dashboard</div>
                </Link>
                <Link
                  className="d-flex navLink justify-content-center align-items-center"
                  style={{ maxHeight: "64px" }}
                  to="/dashboard"
                >
                  <div className="text-dark navLink">Organizations</div>
                </Link>
                <Link
                  className="d-flex navLink justify-content-center align-items-center"
                  style={{ maxHeight: "64px" }}
                  to="/dashboard"
                >
                  <div className="text-dark navLink">Workspaces</div>
                </Link>
              </div>
            ) : (
              <div className="d-flex" style={{ gap: "4px" }}>
                <Link
                  className=" d-flex navLink justify-content-center align-items-center"
                  style={{ maxHeight: "64px" }}
                  to="/dashboard"
                >
                  <div className="text-dark navLink">My Dashboard</div>
                </Link>
                <Link
                  className="d-flex navLink justify-content-center align-items-center"
                  style={{ maxHeight: "64px" }}
                  to="/dashboard"
                >
                  <div className="text-dark navLink">Organizations</div>
                </Link>
                <Link
                  className="d-flex navLink justify-content-center align-items-center"
                  style={{ backgroundColor: "#D9F8D7", maxHeight: "64px" }}
                  to="/dashboard"
                >
                  <div className="text-dark fw-bold navLink">Workspaces</div>
                </Link>
              </div>
            )}
          </>
          {user ? (
            <img id="navBarProfilePicture" src={user.avatar} />
          ) : (
            <div></div>
          )}
        </div>
      </Navbar>
    </div>
  );
}
