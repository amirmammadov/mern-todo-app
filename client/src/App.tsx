import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TasksPage from "./components/organisms/TasksPage/TasksPage";
import RegisterPage from "./components/organisms/RegisterPage/RegisterPage";
import LoginPage from "./components/organisms/LoginPage/LoginPage";
import TaskDetailPage from "./components/organisms/TaskDetailPage/TaskDetailPage";

import { StateProps } from "./interfaces";

const App = () => {
  const isAuth = useSelector((state: StateProps) => state.token);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/tasks"
        element={isAuth ? <TasksPage /> : <Navigate to="/" />}
      />
      <Route
        path="/taskDetail"
        element={isAuth ? <TaskDetailPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
