import { constants as C } from "../actions/constants";
import { produce } from "immer";

// Dummy data for testing
const initialState = {
  tasks: {},
  columns: {},
  columnOrder: [],
  id: null,
};

const board = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case C.LOAD_BOARD:
      return produce(state, (draft) => {
        payload.columns.forEach((column) => {
          draft.columns[column._id] = column;
          draft.columnOrder.push(column._id);
        });
        payload.tasks.forEach((task) => (draft.tasks[task._id] = task));
        draft.id = payload._id;
      });

    case C.ADD_COLUMN:
      return produce(state, (draft) => {
        draft.columns[payload._id] = payload;
        draft.columnOrder.push(payload._id);
      });
    case C.MOVE_COLUMNS:
      return produce(state, (draft) => {
        draft.columnOrder.splice(payload.colStart, 1);
        draft.columnOrder.splice(payload.colEnd, 0, payload.colId);
      });
    case C.MOVE_TASK_TO_SAME_COLUMN:
      return produce(state, (draft) => {
        draft.columns[payload.colStart].taskIds.splice(payload.taskStart, 1);
        draft.columns[payload.colStart].taskIds.splice(
          payload.taskEnd,
          0,
          payload.taskId
        );
      });
    case C.MOVE_TASK_TO_DIFFERENT_COLUMN:
      return produce(state, (draft) => {
        draft.columns[payload.colStart].taskIds.splice(payload.taskStart, 1);
        draft.columns[payload.colEnd].taskIds.splice(
          payload.taskEnd,
          0,
          payload.taskId
        );
      });
    case C.ADD_TASK:
      return produce(state, (draft) => {
        draft.tasks[payload.task._id] = payload.task;
        draft.columns[payload.columnId].taskIds.push(payload.task._id);
      });
    case C.EDIT_TASK:
      return produce(state, (draft) => {
        draft.tasks[payload.taskId][payload.field] = payload.value;
      });
    default:
      return state;
  }
};
export default board;
