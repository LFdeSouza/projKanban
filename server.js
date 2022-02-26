import "dotenv/config";
import express from "express";
import userRouter from "./routes/api/user.js";
import boardRouter from "./routes/api/board.js";

const app = express();

//Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => res.send("Hello, world"));
app.use("/users", userRouter);
app.use("/boards", boardRouter);

//Run server
import("./models/db.js");
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
