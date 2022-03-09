import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { PencilIcon } from "@heroicons/react/outline";

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className=" task p-2 mb-2 bg-gunmetal-10 hover:bg-gunmetal-20 rounded flex justify-between shadow-sm"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{task.title}</p>
          <PencilIcon className="edit-task invisible h-5 w-5 text-gunmetal-100 mr-3" />
        </div>
      )}
    </Draggable>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
};

export default Task;
