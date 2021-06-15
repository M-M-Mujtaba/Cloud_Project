import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { useHistory } from "react-router-dom";
import LoginNavBar from "../layouts/LoginNavBar";


export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await axios.post('localhost:8000/admin_login', {
        username: email,
        password: password
      });
      const token = result.token;
      localStorage.setItem("token", token);
      history.push("/Home");
    }
    catch (err) {
      console.log("[Admin Login Screen] Error Occured while sending login request.");
      console.log(err);
    }
  }

  return (
    <div>
      <LoginNavBar />
      <div className="container">
        <div className="w-70 mx-auto shadow p-3">
          <div className="Login">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                block
                size="lg"
                style={{ marginTop: 10 + "px" }}
                type="submit"
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
