import { default as mongoose } from "mongoose";

const columnSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    taskIds: [mongoose.Schema.Types.ObjectId],
    description: { type: String },
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    label: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  columns: [columnSchema],
  tasks: [taskSchema],
});

export const Board = mongoose.model("board", boardSchema);
