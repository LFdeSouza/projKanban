import { constants as C } from "./constants";

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

export const addTask = (columnId) => (dispatch) => {
  dispatch({
    type: C.ADD_TASK,
    payload: columnId,
  });
};
