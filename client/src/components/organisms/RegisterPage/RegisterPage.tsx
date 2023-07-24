/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Form from "../../molecules/Form/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./RegisterPage.scss";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (username: string, password: string) => {
    axios
      .post("http://localhost:3000/api/v1/users/register", {
        username,
        password,
      })
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  return (
    <div className="register-page">
      <h1 className="register-page--title">Register Page</h1>
      <Form onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
