import React, { useState } from "react";

import loginService from "../services/login";
import plantService from "../services/plants";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");
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
      setUser(user);
    } catch (error) {
      console.log(error);
    }

    setPassword("");
    setUsername("");
    return;
  };

  const handleCreateUserSubmit = async event => {
    event.preventDefault();

    await loginService.create({ name, username, password });

    setCreateUser(0);

    setName("");
    setPassword("");
    setUsername("");

    return;
  };

  if (createUser === 1) {
    return (
      <div className="container">
        <form onSubmit={handleCreateUserSubmit}>
          <div className="form-group">
            <div className="form-label"> Name</div>
            <input
              className="form-control"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <div className="form-label"> Username</div>
            <input
              className="form-control"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <div className="form-label"> Password</div>
            <input
              className="form-control"
              type="password"
              placeholder="Enter password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Create User
          </button>
          <button
            onClick={() => setCreateUser(0)}
            className="btn btn-createuser"
          >
            Back
          </button>
        </form>
      </div>
    );
  } else
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
          <button
            onClick={() => setCreateUser(1)}
            className="btn btn-createuser"
          >
            Create User?
          </button>
        </form>
      </div>
    );
};

export default Login;
