import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ColumnMemo from "./ColumnMemo";
import { useSelector, useDispatch } from "react-redux";
import {
  loadBoard,
  moveColumns,
  moveTasks,
  addColumn,
} from "../../redux/actions/board";
import { PlusIcon, XIcon } from "@heroicons/react/solid";

const Board = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [columnForm, setColumnForm] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const state = useSelector((state) => state.board);

  useEffect(() => {
    if (state.id === boardId) console.log("true");
    dispatch(loadBoard(boardId));
  }, [boardId, dispatch]);

  const onNewColumn = (e) => {
    e.preventDefault();
    dispatch(addColumn(boardId, columnTitle));
    setColumnTitle("");
    setColumnForm(false);
  };
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
        moveColumns(boardId, source.index, destination.index, draggableId)
      );
    }

    // //Moving tasks
    return dispatch(
      moveTasks(
        boardId,
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
            className="absolute inset-0 p-10 flex overflow-auto bg-gunmetal-300 -z-20"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* <div className="mt-14 p-10 flex overflow-auto"> */}
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];
              return (
                <ColumnMemo
                  key={column._id}
                  column={column}
                  tasks={state.tasks}
                  boardId={boardId}
                  index={index}
                />
              );
            })}
            {columnForm ? (
              <div className="flex flex-col flex-shrink-0 max-h-32 w-[15rem] mt-14 p-4 bg-gunmetal-50 rounded shadow-lg  cursor-pointer">
                <form onSubmit={(e) => onNewColumn(e)}>
                  <input
                    className="p-2 pl-3 bg-gray-100 rounded w-full"
                    type="text"
                    name="columnTitle"
                    value={columnTitle}
                    placeholder="Column title"
                    onChange={(e) => setColumnTitle(e.target.value)}
                  />
                  <div className="flex items-center mt-4 gap-2">
                    <button
                      className="p-1 px-4 bg-indigo-500 rounded hover:bg-indigo-400 text-white"
                      type="submit"
                    >
                      Add
                    </button>
                    <button onClick={() => setColumnForm(!columnForm)}>
                      <XIcon className="w-7 h-7 text-gunmetal-300" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <button
                className="flex items-center flex-shrink-0 w-[15rem] p-2 mt-14 mr-5 max-h-10 bg-gunmetal-50  rounded-md shadow-lg  cursor-pointer"
                onClick={() => setColumnForm(!columnForm)}
              >
                <PlusIcon className="w-5 h-5 mr-3 text-gunmetal-300" />
                <span className="text-gunmetal-300">Add new column</span>
              </button>
            )}
            {/* </div> */}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
