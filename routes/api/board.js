import express from "express";
import { requireAuth } from "../../middleware/authMiddleware.js";
import {
  createBoard,
  getAllBoards,
  getBoard,
  deleteBoard,
  createColumn,
  editColumn,
  editBoard,
  deleteColumn,
  createTask,
  updateTask,
  deleteTask,
} from "../../controllers/boardCtrl.js";

const boardRouter = express.Router();

// Boards
boardRouter.post("/", requireAuth, createBoard);
boardRouter.get("/", requireAuth, getAllBoards);
boardRouter.get("/:id", requireAuth, getBoard);
boardRouter.put("/:id", requireAuth, editBoard);
boardRouter.delete("/:id", requireAuth, deleteBoard);

// Columns
boardRouter.post("/columns/:id", requireAuth, createColumn);
boardRouter.put("/columns/:boardId/:columnId", requireAuth, editColumn);
boardRouter.delete("/columns/:boardId/:columnId", requireAuth, deleteColumn);

// Tasks
boardRouter.post("/tasks/:boardId/:columnId", requireAuth, createTask);
boardRouter.put("/tasks/:boardId/:columnId/:taskId", requireAuth, updateTask);
boardRouter.delete(
  "/tasks/:boardId/:columnId/:taskId",
  requireAuth,
  deleteTask
);

export default boardRouter;
