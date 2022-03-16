import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { PencilIcon } from "@heroicons/react/outline";
import { openEditTaskForm } from "../../redux/actions/modal";

const Task = ({ task, index }) => {
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={() => dispatch(openEditTaskForm(task.id))}
          className=" task p-2 mb-2 bg-gunmetal-10 hover:bg-gunmetal-20 rounded shadow-sm"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex justify-between cursor-pointer">
            <p className="text-sm">{task.title}</p>
            <PencilIcon className="edit-task invisible h-5 w-5 text-gunmetal-100 mr-3" />
          </div>
        </div>
      )}
    </Draggable>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Task;
