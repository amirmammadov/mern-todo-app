import { useState, useEffect, useRef } from "react";

import axios, { AxiosResponse } from "axios";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { setDeleteTodo, setUpdateTodo } from "../../../features/authSlice";

import { StateProps, TodosProps } from "../../../interfaces";

import "./TaskItem.scss";
import EditButton from "../../atoms/EditButton/EditButton";
import DeleteButton from "../../atoms/DeleteButton/DeleteButton";

interface TaskItemProps {
  task: string;
  id: number;
}

const TaskItem = ({ task, id }: TaskItemProps) => {
  const [todo, setTodo] = useState<TaskItemProps>({ task: "", id: -1 });

  const inputRef = useRef<HTMLInputElement>(null);

  const userID = useSelector((state: StateProps) => state.userID);
  const token = useSelector((state: StateProps) => state.token);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setTodo({ task, id });
  }, [task, id]);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/api/v1/todos/${userID}/todos/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res: AxiosResponse<number>) => {
        dispatch(setDeleteTodo(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEdit = (id: number) => {
    if (inputRef.current && inputRef.current.disabled) {
      inputRef.current.disabled = false;
    } else if (inputRef.current && !inputRef.current.disabled) {
      inputRef.current.disabled = true;
      axios
        .patch(
          `http://localhost:3000/api/v1/todos/${userID}/todos/${id}`,
          { title: todo.task },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res: AxiosResponse<TodosProps>) => {
          dispatch(setUpdateTodo(res.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleSwitch = () => {
    if (inputRef.current?.disabled) {
      navigate("/taskDetail", { state: id });
    }
  };

  return (
    <div className="task-item">
      <button className="task-item__button" onClick={handleSwitch}>
        <input
          type="text"
          className="task-item__input"
          value={todo.task}
          onChange={(e) =>
            setTodo((prevValues) => {
              return { ...prevValues, task: e.target.value };
            })
          }
          disabled
          ref={inputRef}
        />
      </button>
      <EditButton id={todo.id} onEdit={handleEdit} />
      <DeleteButton id={todo.id} onDelete={handleDelete} />
    </div>
  );
};

export default TaskItem;
