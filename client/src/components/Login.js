import React, { useState } from "react";

import loginService from "../services/login";
import plantService from "../services/plants";
import { Form, FormGroup, FormLabel, Button } from "react-bootstrap";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedPlantUser", JSON.stringify(user));

      plantService.setToken(user.token);
      setUser(user);
    } catch (error) {
      console.log(error);
    }

    setPassword("");
    setUsername("");
    return;
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="username">
          <FormLabel> Username </FormLabel>
          <Form.Control
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel> Password </FormLabel>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
