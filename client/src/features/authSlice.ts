import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TodosProps {
  _id: number;
  userID: number;
  username: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

interface StateProps {
  user: string;
  token: string;
  userID: number;
  todos: TodosProps[];
}

const initialState: StateProps = {
  user: "",
  token: "",
  userID: -1,
  todos: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ user: string; token: string; userID: number }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userID = action.payload.userID;
    },
    setLogout: (state) => {
      state.user = "";
      state.token = "";
      state.userID = -1;
      state.todos = [];
    },
    setTodos: (state, action: PayloadAction<[TodosProps]>) => {
      state.todos = action.payload;
    },
    setDeleteTodo: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => {
        if (todo._id !== id) {
          return todo;
        }
      });
    },
    setUpdateTodo: (state, action: PayloadAction<TodosProps>) => {
      const todoID = action.payload._id;
      const newTitle = action.payload.title;
      state.todos = state.todos.filter((todo) => {
        if (todo._id === todoID) {
          todo.title = newTitle;
        }
        return todo;
      });
    },
  },
});

export const { setLogin, setLogout, setTodos, setDeleteTodo, setUpdateTodo } =
  authSlice.actions;

export default authSlice.reducer;
