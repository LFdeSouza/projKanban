import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ColumnMemo from "./ColumnMemo";
import { useSelector, useDispatch } from "react-redux";
import { loadBoard, moveColumns, moveTasks } from "../../redux/actions/board";
import { PlusIcon, XIcon } from "@heroicons/react/solid";

const Board = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [columnForm, setColumnForm] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const state = useSelector((state) => state.board);

  useEffect(() => dispatch(loadBoard(boardId)), []);

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
      return dispatch(
        moveColumns(source.index, destination.index, draggableId)
      );
    }

    // //Moving tasks
    return dispatch(
      moveTasks(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="columns" direction="horizontal" type="column">
        {(provided) => (
          <section
            className="absolute inset-0 bg-gunmetal-300 -z-20"
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
              {columnForm ? (
                <div className="items-center bg-gunmetal-50 p-2 rounded-md shadow-lg w-[15rem] cursor-pointer">
                  <form className="">
                    <input
                      className="p-0.5 pl-3 bg-gray-100 rounded w-full"
                      type="text"
                      name="columnTitle"
                      value={columnTitle}
                      placeholder="Column title"
                      onChange={(e) => setColumnTitle(e.target.value)}
                    />
                    <div className="flex items-center mt-2 gap-2">
                      <button
                        className="p-1 px-4 bg-cyan-600 rounded hover:bg-cyan-500"
                        type="submit"
                      >
                        Add
                      </button>
                      <button onClick={() => setColumnForm(!columnForm)}>
                        <XIcon className="w-5 h-5 text-gunmetal-400" />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <button
                  className="flex items-center bg-gunmetal-50 p-2 mr-5 rounded-md shadow-lg w-[15rem] cursor-pointer"
                  onClick={() => setColumnForm(!columnForm)}
                >
                  <PlusIcon className="w-5 h-5 mr-3 text-gunmetal-300" />
                  <span className="text-gunmetal-300">Add new column</span>
                </button>
              )}
            </div>
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
