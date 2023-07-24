/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import axios, { AxiosResponse } from "axios";

import { useSelector } from "react-redux";

import { StateProps } from "../../../interfaces";

import "./TaskDetail.scss";

const TaskDetail = () => {
  const [task, setTask] = useState("");
  const data = useLocation();

  const userID = useSelector((state: StateProps) => state.userID);
  const token = useSelector((state: StateProps) => state.token);

  const fetchTodo = () => {
    axios
      .get(`http://localhost:3000/api/v1/todos/${userID}/todos/${data.state}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res: AxiosResponse<string>) => {
        setTask(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <div className="task-detail-container">
      <div className="task-detail__id">ID: {data.state}</div>
      <input type="text" disabled value={task} className="task-detail__input" />
    </div>
  );
};

export default TaskDetail;
