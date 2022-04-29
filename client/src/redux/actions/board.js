import { constants as C } from "./constants";
import axios from "axios";

export const loadBoard = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/boards/${id}`);
    dispatch({ type: C.LOAD_BOARD, payload: res.data.board });
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const addColumn = (id, title) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ title });

    const res = await axios.post(`/api/boards/columns/${id}`, body, config);
    dispatch({ type: C.ADD_COLUMN, payload: res.data.column });
  } catch (err) {
    console.log(err);
  }
};

export const deleteColumn = (boardId, columnId) => async (dispatch) => {
  await axios.delete(`/api/boards/columns/${boardId}/${columnId}`);

  dispatch({ type: C.DELETE_COLUMN, payload: columnId });
};

export const moveColumns =
  (boardId, indexStart, indexEnd, columnId) => async (dispatch) => {
    dispatch({
      type: C.MOVE_COLUMNS,
      payload: { indexStart, indexEnd, columnId },
    });

    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ boardId, indexStart, indexEnd, columnId });
    return await axios.put(
      `/api/boards/columns/moveColumn/${boardId}/${columnId}`,
      body,
      config
    );
  };

export const moveTasks =
  (boardId, colStart, colEnd, taskStart, taskEnd, taskId) =>
  async (dispatch) => {
    const config = { headers: { "Content-Type": "application/json" } };
    if (colStart === colEnd) {
      const body = JSON.stringify({ colStart, taskStart, taskEnd, taskId });
      dispatch({
        type: C.MOVE_TASK_TO_SAME_COLUMN,
        payload: { colStart, taskStart, taskEnd, taskId },
      });
      return await axios.put(
        `/api/boards/columns/taskOrderSameColumn/${boardId}/${colStart}`,
        body,
        config
      );
    }
    const body = JSON.stringify({
      colStart,
      colEnd,
      taskStart,
      taskEnd,
      taskId,
    });

    dispatch({
      type: C.MOVE_TASK_TO_DIFFERENT_COLUMN,
      payload: { colStart, colEnd, taskStart, taskEnd, taskId },
    });
    return await axios.put(
      `/api/boards/columns/taskOrderAnotherColumn/${boardId}/${colStart}/${colEnd}`,
      body,
      config
    );
  };

export const addTask = (title, boardId, columnId) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ title });

  const res = await axios.post(
    `/api/boards/tasks/${boardId}/${columnId}`,
    body,
    config
  );
  dispatch({
    type: C.ADD_TASK,
    payload: { task: res.data.task, columnId },
  });
};

export const editTask = (taskId, field, value) => (dispatch) => {
  dispatch({
    type: C.EDIT_TASK,
    payload: { taskId, field, value },
  });
};
