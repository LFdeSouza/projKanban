import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ColumnMemo from "./ColumnMemo";
import { connect } from "react-redux";
import { moveColumns, moveTasks } from "../../redux/actions/board";

const Board = ({ state, moveColumns, moveTasks }) => {
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
      return moveColumns(source.index, destination.index, draggableId);
    }

    // //Moving tasks
    return moveTasks(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    );
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

const mapStateToProps = (store) => ({
  state: store.boardReducer,
});
export default connect(mapStateToProps, { moveColumns, moveTasks })(Board);
