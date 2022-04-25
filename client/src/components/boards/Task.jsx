import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { PencilIcon } from "@heroicons/react/outline";
import { openEditTaskForm } from "../../redux/actions/modal";

const Task = ({ task, index }) => {
  const dispatch = useDispatch();
  const label =
    task.priority === "highest"
      ? "bg-red-500"
      : task.priority === "high"
      ? "bg-orange-500"
      : task.priority === "medium"
      ? "bg-yellow-500"
      : task.priority === "low"
      ? "bg-cyan-500"
      : task.priority === "lowest"
      ? "bg-green-500"
      : null;

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={() => dispatch(openEditTaskForm(task._id))}
          className=" task p-2 mb-2 bg-gray-50 hover:bg-gunmetal-10 rounded shadow-sm"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="cursor-pointer">
            {task.priority && (
              <div className={`w-10 h-2 mb-1 rounded-lg ${label}`} />
            )}
            <div className=" flex justify-between cursor-pointer">
              <p className="text-sm">{task.title}</p>
              <PencilIcon className="edit-task invisible h-5 w-5 text-gunmetal-100 mr-3" />
            </div>
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
