import { FormEvent, useState } from "react";

import "./Form.scss";

import { FormProps } from "../../../interfaces";

const Form = ({ onSubmit }: FormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <div className="formItem">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="inputField"
            placeholder="Enter username..."
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="inputField"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="formBtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
