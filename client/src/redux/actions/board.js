import { constants as C } from "./constants";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const loadBoard = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/boards/${id}`);
    dispatch({ type: C.LOAD_BOARD, payload: res.data.board });
  } catch (err) {
    console.log(err.response.data.errors);
  }
};
export const moveColumns = (colStart, colEnd, colId) => (dispatch) => {
  dispatch({
    type: C.MOVE_COLUMNS,
    payload: { colStart, colEnd, colId },
  });
};

export const moveTasks =
  (colStart, colEnd, taskStart, taskEnd, taskId) => (dispatch) => {
    if (colStart === colEnd) {
      return dispatch({
        type: C.MOVE_TASK_TO_SAME_COLUMN,
        payload: { colStart, taskStart, taskEnd, taskId },
      });
    }

    dispatch({
      type: C.MOVE_TASK_TO_DIFFERENT_COLUMN,
      payload: { colStart, colEnd, taskStart, taskEnd, taskId },
    });
  };

export const addTask = (title, columnId) => (dispatch) => {
  dispatch({
    type: C.ADD_TASK,
    payload: { title, columnId, id: uuidv4() },
  });
};

export const editTask = (taskId, field, value) => (dispatch) => {
  dispatch({
    type: C.EDIT_TASK,
    payload: { taskId, field, value },
  });
};
