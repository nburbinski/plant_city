import React, { useState } from "react";
import loginService from "../services/login";

const CreateUser = ({ setCreateUser, setConfMessage }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleCreateUserSubmit = async event => {
    event.preventDefault();

    try {
      await loginService.create({ name, username, password });

      setCreateUser(0);

      setName("");
      setPassword("");
      setUsername("");
    } catch (error) {
      setConfMessage(error.message);
    }

    return;
  };

  return (
    <>
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
        <button onClick={() => setCreateUser(0)} className="btn btn-createuser">
          Back
        </button>
      </form>
    </>
  );
};

export default CreateUser;
