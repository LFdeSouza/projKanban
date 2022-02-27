import express from "express";
import {
  deleteUser,
  registerUser,
  loginUser,
  logoutUser,
} from "../../controllers/authCtlr.js";
import { requireAuth } from "../../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.delete("/:id", requireAuth, deleteUser);

export default authRouter;
