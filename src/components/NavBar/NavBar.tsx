import React from "react";
import { Container, Nav, Offcanvas, Navbar } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import taskfieldLogo from "../../../assets/taskfield_logo_black.svg";
import "./NavBar.css";

export default function NavBar() {
  const activeWorkSpace = useAppSelector(
    (state) => state.userSlice.activeWorkSpace
  );
  const user = useAppSelector((state) => state.userSlice.userData);
  return (
    <div>
      <Navbar id="navBar" className="w-100" expand={false}>
        <div className="d-flex w-100 justify-content-between mx-3">
          {activeWorkSpace !== 0 ? (
            <img
              style={{ visibility: "hidden" }}
              className="align-self-center"
              src={taskfieldLogo}
            />
          ) : (
            <Navbar.Brand href="#">
              <img className="align-self-center" src={taskfieldLogo} />
            </Navbar.Brand>
          )}
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
