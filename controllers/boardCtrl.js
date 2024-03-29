import { Board } from "../models/Board.js";
import { default as mongoose } from "mongoose";

export const createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user,
    });

    return res.status(201).json({ board });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(errors);
  }
};

export const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user });

    return res.json({ boards });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(err);
  }
};

export const getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) return res.status(400).json({ msg: "Board not found" });

    return res.json({ board });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(err);
  }
};

export const editBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) return res.status(400).json({ msg: "Board not found" });

    Object.entries(req.body).forEach(([key, value]) => {
      board[key] = value;
    });

    await board.save();
    res.json({ board });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(errors);
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete({ _id: req.params.id });

    return res.json("Board removed successfully");
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(errors);
  }
};

export const createColumn = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(400).json({ msg: "Board not found" });

    // const column = req.body;
    board.columns.push(req.body);
    board.columnOrder.push(board.columns[board.columns.length - 1]._id);

    const newBoard = await board.save();

    return res.json({ column: newBoard.columns[newBoard.columns.length - 1] });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(errors);
  }
};

export const editColumn = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) return res.status(400).json({ msg: "Board not found" });

    const column = await board.columns.id(req.params.columnId);
    if (!column) return res.status(400).json({ msg: "Column not found" });

    Object.entries(req.body).forEach(([key, value]) => {
      column[key] = value;
    });

    await board.save();
    res.json({ column });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(errors);
  }
};

export const moveColumn = async (req, res) => {
  const board = await Board.findById(req.params.boardId);
  if (!board) return res.status(400).json({ msg: "Board not found" });

  board.columnOrder.splice(req.body.indexStart, 1);
  board.columnOrder.splice(req.body.indexEnd, 0, req.params.columnId);

  await board.save();
  return res.json({ msg: board.columnOrder });
};

export const moveTaskSameColumn = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) return res.status(400).json({ msg: "Board not found" });

    const column = board.columns.id(req.body.colStart);
    if (!column) return res.status(400).json({ msg: "Column not found" });

    //Remove task from array
    column.taskIds.splice(req.body.taskStart, 1);

    //Add task to new position
    column.taskIds.splice(req.body.taskEnd, 0, req.body.taskId);
    await board.save();
    return res.json({ taskOrder: column.taskOrder });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(errors);
  }
};

export const moveTaskAnotherColumn = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) return res.status(400).json({ msg: "Board not found" });

    const startColumn = board.columns.id(req.body.colStart);
    if (!startColumn) return res.status(400).json({ msg: "Column not found" });

    const endColumn = board.columns.id(req.body.colEnd);
    if (!endColumn) return res.status(400).json({ msg: "column not found" });

    //Remove task from array
    startColumn.taskIds.splice(req.body.taskStart, 1);

    //Add task to new position
    endColumn.taskIds.splice(req.body.taskEnd, 0, req.body.taskId);
    await board.save();
    return res.json({ taskOrder: req.body.colEnd.taskOrder });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(errors);
  }
};

export const deleteColumn = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) return res.status(400).json({ msg: "Board not found" });

    const column = board.columns.id(req.params.columnId);
    if (!column) return res.status(400).json({ msg: "Column not found" });

    const columnIndex = board.columnOrder.findIndex(
      (item) => item === req.body.column
    );

    board.columnOrder.splice(columnIndex, 1);
    column.remove();
    await board.save();

    return res.json({ board });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json(errors);
  }
};

export const createTask = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) return res.status(400).json({ msg: "Board not found" });

    const column = board.columns.id(req.params.columnId);
    if (!column)
      return res.status(400).json({ msg: { msg: "Column not found" } });

    board.tasks.push({
      title: req.body.title,
      description: req.body.description,
      label: req.body.label,
    });

    column.taskIds.push(board.tasks[board.tasks.length - 1]);

    await board.save();
    res.status(201).json({ task: board.tasks[board.tasks.length - 1] });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json({ errors });
  }
};

export const editTask = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) return res.status(400).json({ msg: "Board not found" });

    const task = board.tasks.id(req.params.taskId);
    if (!task) return res.status(400).json({ msg: "Task not found" });

    //Update data
    Object.entries(req.body).forEach(([key, value]) => {
      task[key] = value;
    });

    await board.save();
    return res.json({ task });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json({ errors });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) return res.status(400).json({ msg: "Board not found" });

    const column = board.columns.id(req.params.columnId);
    if (!column) return res.status(400).json({ msg: "Column not found" });

    const task = board.tasks.id(req.params.taskId);
    if (!task) return res.status(400).json({ msg: "Task not found" });

    //remove task from column taskIds array
    const removeIndex = column.taskIds.findIndex(
      (task) => task === req.params.taskId
    );
    column.taskIds.splice(removeIndex, 1);

    task.remove();
    await board.save();
    res.json({ msg: "Task removed" });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json({ errors });
  }
};

const handleErrors = (err) => {
  console.error(err);
  const errors = {};

  if (err.message.includes("board validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message;
    });
    return errors;
  }
  return err;
};
