import React from "react";
import PropTypes from "prop-types";
import { PlusIcon } from "@heroicons/react/solid";
import Task from "./Task";

const Column = () => {
  return (
    <div className="bg-gunmetal-50 p-3 rounded-lg shadow-lg ">
      <div className="w-[15rem]">
        <h1 className="p-1 mb-2 font-semibold">Todo</h1>
        <div className="max-h-96 overflow-auto">
          <Task />
        </div>

        <button className="w-full flex justify-start items-center p-1 rounded-sm hover:bg-gunmetal-100 ">
          <PlusIcon className="edit-task w-5 h-5 text-gunmetal-300" />
          <span className="text-sm text-gunmetal-300">Add a task</span>
        </button>
      </div>
    </div>
  );
};

Column.propTypes = {};

export default Column;
