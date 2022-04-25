import { constants as C } from "../actions/constants";
import { produce } from "immer";

// Dummy data for testing
const initialState = {
  tasks: {
    task1: {
      _id: "task1",
      title: "Task 1",
      description: "",
      priority: "highest",
    },
    task2: {
      _id: "task2",
      title: "Task 2",
      description: "",
      priority: "lowest",
    },
    task3: { _id: "task3", title: "Task 3", description: "", priority: "low" },
    task4: { _id: "task4", title: "Task 4", description: "" },
  },
  columns: {
    "column-1": {
      _id: "column-1",
      title: "To do",
      taskIds: ["task1", "task2", "task3", "task4"],
    },
    "column-2": {
      _id: "column-2",
      title: "Doing",
      taskIds: [],
    },
  },
  //facilitates reordering
  columnOrder: [],
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
      });

    case C.ADD_COLUMN:
      return state;
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
        draft.tasks[payload._id] = { title: payload.title, _id: payload._id };
        draft.columns[payload.columnId].taskIds.push(payload.id);
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
