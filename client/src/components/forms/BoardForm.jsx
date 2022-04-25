import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../../redux/actions/auth";

const BoardForm = ({ closeForm }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const onSubmit = (title) => {
    dispatch(createBoard(title));
    closeForm();
  };

  return (
    <section className="fixed inset-0 bg-black/50">
      <div className=" h-screen flex flex-row items-center justify-center">
        <form
          className="p-2 flex flex-col border-2 space-y-4 border-black rounded bg-gunmetal-50 "
          method="dialog"
        >
          <div className="mt-2">
            <label htmlFor="board-name">Board name</label>
            <input
              className="p-1 mx-2 border-2 border-gray-300 rounded"
              type="text"
              name="board-name"
              placeholder="Enter board name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-around">
            <button
              className="py-2 px-6 rounded bg-indigo-600 text-white"
              type="submit"
              onClick={() => onSubmit(title)}
            >
              Save
            </button>
            <button
              className="py-2 px-6 rounded bg-indigo-600 text-white"
              onClick={() => closeForm()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BoardForm;
