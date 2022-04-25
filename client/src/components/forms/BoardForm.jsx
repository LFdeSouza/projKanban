import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../../redux/actions/auth";
import { XIcon } from "@heroicons/react/solid";

const BoardForm = ({ closeForm }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const onSubmit = (title) => {
    dispatch(createBoard(title));
    closeForm();
  };

  return (
    <section className="fixed inset-0 bg-black/10">
      <div className=" h-screen flex flex-row items-center justify-center">
        <form
          className="fixed top-[20rem] p-4 flex flex-col space-y-4 rounded bg-gunmetal-50 shadow-lg"
          method="dialog"
        >
          <div className="mt-2">
            <label htmlFor="board-name">Board name</label>
            <input
              className="p-2 mx-2 rounded"
              type="text"
              name="board-name"
              placeholder="Enter board name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              className="py-2 px-6 rounded bg-indigo-600 text-white"
              type="submit"
              onClick={() => onSubmit(title)}
            >
              Save
            </button>
            <button onClick={() => closeForm()}>
              <XIcon className="w-7 h-7 text-gunmetal-300" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BoardForm;
