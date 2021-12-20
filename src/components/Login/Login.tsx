import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import taskfieldLogo from "../../../assets/taskfield_logo_black.svg";

export default function Login() {
  const navigate = useNavigate();
  const [logIn, setLogIn] = useState({
    email: "",
    password: ""
  });
  console.log(logIn);

  // const User = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setTimeout(function () {
        navigate("/dashboard");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loggin-cont">
      <img src={taskfieldLogo} />
      <div className="content-loggin-cont">
        <h1 className="loggin-header py-4">LOGIN</h1>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Form.Control
            type="text"
            placeholder="Email"
            className="email-input my-3"
            value={logIn.email}
            // onChange={(e) => handleOnChange(e, "email")}
            onChange={(e) => setLogIn({ ...logIn, email: e.target.value })}
          />
          <Form.Control
            type="password"
            placeholder="Password"
            className="password-input my-3"
            value={logIn.password}
            // onChange={(e) => handleOnChange(e, "password")}
            onChange={(e) => setLogIn({ ...logIn, password: e.target.value })}
          />
          <Form.Check
            type="checkbox"
            label="Remember me"
            className="check-input my-3"
          />
          <Button type="submit" className="log-in-btn my-2">
            LOGIN
          </Button>
        </Form>
      </div>
    </div>
  );
}
