import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "../../../features/authSlice";

import axios, { AxiosResponse } from "axios";

import "./TaskList.scss";

import { StateProps, TodosProps } from "../../../interfaces";

import TaskItem from "../TaskItem/TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState<TodosProps[]>([]);

  const todos = useSelector((state: StateProps) => state.todos);
  const userID = useSelector((state: StateProps) => state.userID);
  const token = useSelector((state: StateProps) => state.token);

  const dispatch = useDispatch();

  const fetchTodos = () => {
    axios
      .get(`http://localhost:3000/api/v1/todos/${userID}/todos`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res: AxiosResponse<[TodosProps]>) => dispatch(setTodos(res.data)))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTasks(todos);
  }, [todos]);

  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem key={task._id} task={task.title} id={task._id} />
        ))
      ) : (
        <div className="task-list__lists-empty">There is no task yet!</div>
      )}
    </div>
  );
};

export default TaskList;
