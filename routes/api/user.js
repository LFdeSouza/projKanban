import express from "express";
import { deleteUser, registerUser } from "../../controllers/userCtrl.js";

const userRouter = express.Router();

userRouter.route("/").post(registerUser);
userRouter.route("/:id").delete(deleteUser);

export default userRouter;
