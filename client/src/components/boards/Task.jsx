import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { PencilIcon } from "@heroicons/react/outline";

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={` bg-gunmetal-10 hover:bg-gray-200 shadow-md rounded"
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
        >
          <ul className="space-y-4">
            <li className="task my-2 flex justify-between items-center cursor-pointer break-all">
              <a href="# " className="task p-2 text-sm">
                {task.title}
              </a>
              <span className=" edit-task invisible">
                <PencilIcon className=" edit-task invisiblew-3.5 h-3.5 m-1 text-gunmetal-300 " />
              </span>
            </li>
          </ul>
        </div>
      )}
    </Draggable>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
};

export default Task;
