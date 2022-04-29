import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import TaskMemo from "./TaskMemo";
import { useDispatch } from "react-redux";
import { addTask, deleteColumn } from "../../redux/actions/board";
import { PlusIcon, DotsHorizontalIcon } from "@heroicons/react/solid";

const Column = ({ column, tasks, index, boardId }) => {
  const [taskForm, setTaskForm] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (newTask === "") return;
    dispatch(addTask(newTask, boardId, column._id));
    setNewTask("");
    setTaskForm(false);
  };

  const onDeleteColumn = (columnId) => {
    if (column.taskIds.length) {
      console.log("Cannot delete column while there are still tasks on it");
      return;
    }

    dispatch(deleteColumn(boardId, columnId));
  };

  return (
    <Draggable draggableId={column._id} index={index}>
      {(provided) => (
        <div
          className="column bg-gunmetal-50 min-w-[15rem] h-fit mt-14 p-2 mr-5 rounded shadow-lg "
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex items-start justify-between relative">
            <h1 className="p-1 mb-2 font-semibold text-gunmetal-500">
              {column.title}
            </h1>
            <DotsHorizontalIcon
              className="delete-column w-5 h-5 invisible text-gunmetal-200 cursor-pointer"
              onClick={() => setShowDeleteButton(!showDeleteButton)}
            />
            {showDeleteButton && (
              <button
                className="absolute w-32 h-8  top-6 left-40 bg-gunmetal-500 text-white rounded"
                onClick={() => onDeleteColumn(column._id)}
              >
                Delete column
              </button>
            )}
          </div>
          <Droppable droppableId={column._id}>
            {(provided) => (
              <div
                className="max-h-[48rem] p-1 overflow-auto"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <TaskMemo tasks={tasks} />
                {provided.placeholder}
                {taskForm ? (
                  <form onSubmit={(e) => onSubmit(e)}>
                    <textarea
                      name="newTask"
                      placeholder="Enter a title for the new task..."
                      onChange={(e) => setNewTask(e.target.value)}
                      value={newTask}
                      className="rounded-sm shadow-md bg-gray-100 text-sm p-2 text-gray-900 w-full"
                    />
                    <div className="flex justify-start items-center space-x-2">
                      <button
                        type="submit"
                        className="px-3 py-2 text-sm text-gray-50 bg-indigo-500 rounded"
                      >
                        Add Task
                      </button>
                      <button
                        onClick={() => setTaskForm(!taskForm)}
                        className="px-3 py-2 text-sm text-gray-900 bg-red-500 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setTaskForm(!taskForm)}
                    className="w-full flex justify-start items-center p-1 rounded-sm hover:bg-gunmetal-100 mt-2"
                  >
                    <PlusIcon className="edit-task w-5 h-5 text-gunmetal-300" />
                    <span className="text-sm text-gunmetal-300">
                      Add a task
                    </span>
                  </button>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

Column.propTypes = {
  column: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export default Column;
