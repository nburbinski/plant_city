import React, { useState } from "react";

import loginService from "../services/login";
import plantService from "../services/plants";
import CreateUser from "./CreateUser";

const Login = ({ setUser, setConfMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, setCreateUser] = useState(0);

  const handleLoginSubmit = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedPlantUser", JSON.stringify(user));

      plantService.setToken(user.token);
      setPassword("");
      setUsername("");
      setUser(user);
    } catch (error) {
      setConfMessage([error.message, 0]);
    }

    return;
  };

  const handleCreateUser = () => {
    setPassword("");
    setUsername("");
    setCreateUser(1);
  };

  if (createUser === 1)
    return (
      <CreateUser
        setConfMessage={setConfMessage}
        setCreateUser={setCreateUser}
      />
    );

  return (
    <div>
      <form onSubmit={handleLoginSubmit} className="login-form">
        <div className="form-group">
          <p className="form-label"> Username </p>
          <input
            className="form-control"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <p className="form-label"> Password </p>
          <input
            className="form-control"
            type="password"
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button className="btn btn-primary m-1" type="submit">
          Login
        </button>
        <button onClick={handleCreateUser} className="btn btn-createuser">
          Create User?
        </button>
      </form>
    </div>
  );
};

export default Login;
