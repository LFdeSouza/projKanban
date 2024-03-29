import express from "express";
import {
  deleteUser,
  registerUser,
  loginUser,
  logoutUser,
  loadUser,
} from "../../controllers/authCtlr.js";
import { requireAuth } from "../../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", requireAuth, loadUser);
userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.delete("/:id", requireAuth, deleteUser);

export default userRouter;
