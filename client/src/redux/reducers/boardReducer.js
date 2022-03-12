import { constants as C } from "../actions/constants";
import { produce } from "immer";

const initialState = {
  tasks: {
    task1: { id: "task1", title: "Task 1" },
    task2: { id: "task2", title: "Task 2" },
    task3: { id: "task3", title: "Task 3" },
    task4: { id: "task4", title: "Task 4" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task1", "task2", "task3", "task4"],
    },
    "column-2": {
      id: "column-2",
      title: "Doing",
      taskIds: [],
    },
  },
  //facilitates reordering
  columnOrder: ["column-1", "column-2"],
};

export const boardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
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
    default:
      return state;
  }
};
