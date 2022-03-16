import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeEditTaskForm } from "../../redux/actions/modal";

const TaskForm = () => {
  const dispatch = useDispatch();
  const taskId = useSelector((state) => state.modal.taskId);
  const task = useSelector((state) => state.board.tasks[taskId]);
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editLabel, setEditLabel] = useState(false);
  const [data, setData] = useState({
    title: task.title,
    description: task.description,
    label: task.label,
  });

  return (
    <>
      <div className="fixed left-0 right-0 p-10 h-[35rem] w-[40rem] mx-auto my-20 rounded bg-gunmetal-10 z-20 shadow-md">
        {editTitle ? (
          <>
            <input
              className="p-2 text-2xl font-bold bg-gray-50 rounded "
              type="text"
              value={data.title}
              name="title"
            />
            <button
              onClick={() => {}}
              className="py-1.5 px-4 ml-4 rounded text-white bg-cyan-700 "
            >
              Save
            </button>
          </>
        ) : (
          <h1
            onClick={() => setEditTitle(!editTitle)}
            className="p-2 text-2xl text-gray-900 font-bold cursor-pointer"
          >
            {data.title}
          </h1>
        )}
        <h1 className="p-2 text-xl text-gray-900 font-bold">Description</h1>
        {editTitle ? (
          <>
            <textarea
              className="p-2 ml-5 text-sm bg-gray-50 rounded "
              type="text"
              value={data.title}
              name="title"
            />
            <button
              onClick={() => {}}
              className="py-1.5 px-4 ml-4 rounded text-white bg-cyan-700 "
            >
              Save
            </button>
          </>
        ) : (
          <h2
            onClick={() => setEditDescription(!editDescription)}
            className="p-2 ml-5 text-sm text-gray-900 cursor-pointer"
          >
            {data.description}
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
