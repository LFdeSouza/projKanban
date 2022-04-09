import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeEditTaskForm } from "../../redux/actions/modal";
import { editTask } from "../../redux/actions/board";
import { XIcon } from "@heroicons/react/solid";

const TaskForm = () => {
  const dispatch = useDispatch();
  const taskId = useSelector((state) => state.modal.taskId);
  const task = useSelector((state) => state.board.tasks[taskId]);
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editPriority, setEditPriority] = useState(false);
  const [data, setData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
  });

  const onChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const closeForm = (field) => {
    setEditTitle(false);
    setEditDescription(false);
    setEditPriority(false);
  };
  const onSubmit = (e, field, value) => {
    e.preventDefault();
    dispatch(editTask(taskId, field, value));
    closeForm(field);
  };

  return (
    <>
      <div className="fixed left-0 right-0 p-10 h-[30rem] w-[40rem] mx-auto my-20 rounded bg-gunmetal-10 z-20 shadow-md">
        {editTitle ? (
          <form
            className="flex items-center mb-3"
            onSubmit={(e) =>
              onSubmit(e, e.target.firstChild.name, e.target.firstChild.value)
            }
          >
            <input
              className="p-2 text-2xl font-bold bg-gray-100 rounded"
              type="text"
              value={data.title}
              name="title"
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            <div className="h-full flex items-center justify-center gap-2">
              <button
                type="submit"
                className="py-2 px-4 ml-4 rounded text-white bg-cyan-700 "
              >
                Save
              </button>
              <button>
                <XIcon className="h-6 w-6 text-gunmetal-400" />
              </button>
            </div>
          </form>
        ) : (
          <h1
            onClick={() => {
              closeForm();
              setEditTitle(!editTitle);
            }}
            className="p-2 text-2xl text-gray-900 mb-3 font-bold cursor-pointer"
          >
            {data.title}
          </h1>
        )}
        <h1 className="p-2 mt-5 text-xl text-gray-900 font-bold">
          Description
        </h1>
        {editDescription ? (
          <form
            className="mb-3 flex flex-col justify-start"
            onSubmit={(e) =>
              onSubmit(e, e.target.firstChild.name, e.target.firstChild.value)
            }
          >
            <textarea
              className="p-2 text-sm bg-gray-100 rounded "
              type="text"
              placeholder="Description"
              value={data.description}
              name="description"
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            <div className="mt-2 h-full flex items-center gap-2">
              <button
                type="submit"
                className="py-2 px-4 rounded text-white bg-cyan-700 "
              >
                Save
              </button>
              <button>
                <XIcon className="h-6 w-6 text-gunmetal-400" />
              </button>
            </div>
          </form>
        ) : (
          <h2
            onClick={() => {
              closeForm();
              setEditDescription(!editDescription);
            }}
            className="p-2 text-sm mb-3 text-gray-900 cursor-pointer"
          >
            {data.description ? data.description : "Add a description"}
          </h2>
        )}
        <h1 className="p-2 text-xl text-gray-900 font-bold">Priority</h1>
        {editPriority ? (
          <form
            className="flex flex-col justify-start   gap-4"
            onSubmit={(e) =>
              onSubmit(e, e.target.firstChild.name, e.target.firstChild.value)
            }
          >
            <select
              name="priority"
              id="priority-select"
              className="p-2 bg-gray-100"
            >
              <option value="highest">Highest</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="lowest">Lowest</option>
            </select>
            <div className="mt-2 h-full flex items-center gap-2">
              <button
                type="submit"
                className="py-2 px-4 rounded text-white bg-cyan-700 "
              >
                Save
              </button>
              <button>
                <XIcon className="h-6 w-6 text-gunmetal-400" />
              </button>
            </div>
          </form>
        ) : (
          <h2
            onClick={() => {
              closeForm();
              setEditPriority(!editPriority);
            }}
            className="p-2 text-sm text-gray-900 cursor-pointer"
          >
            {/* How to update on site? */}
            {data.priority ? data.priority : "Set priority"}
          </h2>
        )}
      </div>
      <div
        onClick={() => dispatch(closeEditTaskForm())}
        className="fixed inset-0 bg-gray-900/50 z-10"
      ></div>
    </>
  );
};

export default TaskForm;
