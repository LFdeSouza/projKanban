import express from "express";

const userRouter = express.Router();

userRouter.route("/").get((req, res) => res.send("Hello from users"));

export default userRouter;
