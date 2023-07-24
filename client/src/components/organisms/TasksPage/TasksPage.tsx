import "./TasksPage.scss";

import { useState } from "react";

import axios, { AxiosResponse } from "axios";

import { useDispatch } from "react-redux";
import { setLogout, setTodos } from "../../../features/authSlice";

import { useSelector } from "react-redux";

import { StateProps, TodosProps } from "../../../interfaces";

import TaskList from "../../molecules/TaskList/TaskList";

const TasksPage = () => {
  const [todo, setTodo] = useState<string>("");

  const dispatch = useDispatch();

  const username = useSelector((state: StateProps) => state.user);

  const userID = useSelector((state: StateProps) => state.userID);
  const token = useSelector((state: StateProps) => state.token);

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleAddTodo = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/todos/${userID}/todos`,
        { userID, title: todo },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res: AxiosResponse<[TodosProps]>) => dispatch(setTodos(res.data)))
      .catch((err) => {
        console.error(err);
      });
    setTodo("");
  };

  return (
    <div className="tasks-page">
      <h1 className="tasks-page__userinfo">User: {username}</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Log off
      </button>
      <h1 className="tasks-page__title">Tasks List</h1>
      <div className="tasks-page__input-container">
        <input
          type="text"
          className="tasks-page__input-item"
          placeholder="Any Idea..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="tasks-page__input-btn" onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <div className="tasks-page__lists">
        <TaskList />
      </div>
    </div>
  );
};

export default TasksPage;
