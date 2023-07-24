/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Form from "../../molecules/Form/Form";
import axios, { AxiosResponse } from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../features/authSlice";

import "./LoginPage.scss";

const LoginPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    axios
      .post("http://localhost:3000/api/v1/users/login", {
        username,
        password,
      })
      .then(
        (
          res: AxiosResponse<{ token: string; user: string; userID: number }>
        ) => {
          dispatch(setLogin(res.data));
          navigate("/tasks", { replace: true });
        }
      )
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  return (
    <div className="login-page">
      <h1 className="login-page--title">Login Page</h1>
      <Form onSubmit={handleLogin} />
      <Link to="/register" replace={true} className="switch-to-login">
        Don't you have an account?
      </Link>
    </div>
  );
};

export default LoginPage;
