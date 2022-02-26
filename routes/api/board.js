import express from "express";
const boardRouter = express.Router();

boardRouter.route("/").get((req, res) => res.send("Hello from board"));

export default boardRouter;
