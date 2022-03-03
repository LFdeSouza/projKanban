import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import { PlusIcon } from "@heroicons/react/solid";
import Task from "./Task";

const Column = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="bg-gunmetal-50 p-3 rounded-md shadow-lg h-full "
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="w-[15rem]">
            <h1 className="p-1 mb-2 font-semibold">{column.title}</h1>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  className="max-h-96 overflow-auto"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                  <button className="w-full flex justify-start items-center p-1 rounded-sm hover:bg-gunmetal-100 mt-2">
                    <PlusIcon className="edit-task w-5 h-5 text-gunmetal-300" />
                    <span className="text-sm text-gunmetal-300">
                      Add a task
                    </span>
                  </button>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};

Column.propTypes = {
  column: PropTypes.object.isRequired,
};

export default Column;
