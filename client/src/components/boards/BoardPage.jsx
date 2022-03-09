import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ColumnMemo from "./ColumnMemo";
import initialData from "./initialData";

const Board = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    //Location of draggable changed?
    if (
      destination.droppableId === source.droppbaleId &&
      destination.index === source.index
    ) {
      return;
    }

    // Moving columns
    if (type === "column") {
      const newColumnOrder = [...state.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setState({ ...state, columnOrder: newColumnOrder });
    }

    //Moving tasks
    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    // Moving from the same columns
    if (startColumn === finishColumn) {
      const newTaskIds = [...startColumn.taskIds];
      newTaskIds.splice(source.index, 1);

      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, taskIds: newTaskIds };
      setState({
        ...state,
        columns: { ...state.columns, [newColumn.id]: newColumn },
      });
    }

    //Moving from different columns
    else if (startColumn !== finishColumn) {
      const startTaskIds = [...startColumn.taskIds];
      startTaskIds.splice(source.index, 1);
      const newStart = { ...startColumn, taskIds: startTaskIds };

      const finishTaskIds = [...finishColumn.taskIds];
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = { ...finishColumn, taskIds: finishTaskIds };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      });
    }
    console.log(state);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="columns" direction="horizontal" type="column">
        {(provided) => (
          <section
            className="absolute inset-0 bg-gunmetal-200 -z-20"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className="mt-14 p-10 flex overflow-auto">
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];

                return (
                  <ColumnMemo
                    key={column.id}
                    column={column}
                    tasks={state.tasks}
                    index={index}
                  />
                );
              })}
            </div>
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
