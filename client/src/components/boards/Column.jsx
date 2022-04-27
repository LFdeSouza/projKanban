import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import { PlusIcon } from "@heroicons/react/solid";
import TaskMemo from "./TaskMemo";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/actions/board";

const Column = ({ column, tasks, index, boardId }) => {
  const [taskForm, setTaskForm] = useState(false);
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (newTask === "") return;
    dispatch(addTask(newTask, boardId, column._id));
    setNewTask("");
    setTaskForm(false);
  };

  return (
    <Draggable draggableId={column._id} index={index}>
      {(provided) => (
        <div
          className="bg-gunmetal-50 p-1 mr-5 rounded-md shadow-lg h-full "
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="w-[15rem]">
            <h1 className="p-1 mb-2 font-semibold">{column.title}</h1>
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
