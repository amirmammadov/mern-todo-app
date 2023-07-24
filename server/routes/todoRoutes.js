import express from "express";

const router = express.Router();

import { verifyToken } from "../middleware/auth.js";

import {
  GetTodos,
  GetTodo,
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
} from "../controllers/todoController.js";

router
  .route("/:userID/todos")
  .get(verifyToken, GetTodos)
  .post(verifyToken, CreateTodo);
router
  .route("/:userID/todos/:id")
  .get(verifyToken, GetTodo)
  .patch(verifyToken, UpdateTodo)
  .delete(verifyToken, DeleteTodo);

export default router;
