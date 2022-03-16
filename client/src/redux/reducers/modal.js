import { constants as C } from "../actions/constants";
import { produce } from "immer";

const initialState = { editTaskModal: false, taskId: "" };

const modal = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case C.OPEN_EDIT_TASK_FORM:
      return produce(state, (draft) => {
        draft.editTaskModal = true;
        draft.taskId = payload;
      });
    case C.CLOSE_EDIT_TASK_FORM:
      return produce(state, (draft) => {
        draft.editTaskModal = false;
        draft.taskId = "";
      });
    default:
      return state;
  }
};

export default modal;
