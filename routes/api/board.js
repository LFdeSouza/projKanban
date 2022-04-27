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
  moveTaskSameColumn,
  moveTaskAnotherColumn,
  deleteColumn,
  createTask,
  editTask,
  deleteTask,
  moveColumn,
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
boardRouter.put("/column/moveColumn/:boardId", requireAuth, moveColumn);
boardRouter.put(
  "/columns/taskOrderSameColumn/:boardId/:columnId",
  requireAuth,
  moveTaskSameColumn
);
boardRouter.put(
  "/columns/taskOrderAnotherColumn/:boardId/:columnStart/:columnEnd",
  requireAuth,
  moveTaskAnotherColumn
);
boardRouter.delete("/columns/:boardId/:columnId", requireAuth, deleteColumn);

// Tasks
boardRouter.post("/tasks/:boardId/:columnId", requireAuth, createTask);
boardRouter.put("/tasks/:boardId/:columnId/:taskId", requireAuth, editTask);
boardRouter.delete(
  "/tasks/:boardId/:columnId/:taskId",
  requireAuth,
  deleteTask
);

export default boardRouter;
