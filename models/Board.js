import { default as mongoose } from "mongoose";

export const columnSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Columns must have a title"] },
    taskIds: [mongoose.Schema.Types.ObjectId],
    description: { type: String },
  },
  { timestamps: true }
);

export const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Tasks must have a title"] },
    label: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const boardSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Boards must have a title"] },
  description: { type: String },
  columns: [columnSchema],
  columnOrder: [],
  tasks: [taskSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export const Board = mongoose.model("board", boardSchema);
