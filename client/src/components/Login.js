import React, { useState } from "react";

import loginService from "../services/login";
import plantService from "../services/plants";

const Login = () => {
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
    } catch (error) {
      console.log(error);
    }

    setPassword("");
    setUsername("");
    return;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          onChange={e => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
        ></input>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
