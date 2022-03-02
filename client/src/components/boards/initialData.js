const initialData = {
  tasks: {
    task1: { id: "task1", content: "Task 1" },
    task2: { id: "task2", content: "Task 2" },
    task3: { id: "task3", content: "Task 3" },
    task4: { id: "task4", content: "Task 4" },
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

export default initialData;
