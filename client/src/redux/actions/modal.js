import { constants as C } from "./constants";

export const openEditTaskForm = (taskId) => (dispatch) =>
  dispatch({ type: C.OPEN_EDIT_TASK_FORM, payload: taskId });

export const closeEditTaskForm = () => (dispatch) =>
  dispatch({ type: C.CLOSE_EDIT_TASK_FORM });
