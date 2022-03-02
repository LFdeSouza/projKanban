import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import initialData from "./initialData";

const Board = () => {
  const [state, setState] = useState(initialData);
  return (
    <section className="absolute inset-0 bg-gunmetal-200 -z-20">
      <div className="mt-14 p-10 flex gap-5 overflow-auto">
        {state.columnOrder.map((columnId, index) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </section>
  );
};

export default Board;
