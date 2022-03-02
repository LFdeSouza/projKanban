import React from "react";
import PropTypes from "prop-types";
import { PencilIcon } from "@heroicons/react/outline";

const Task = (props) => {
  return (
    <div className=" bg-gunmetal-10 hover:bg-gray-200 shadow-lg rounded ">
      <ul className="space-y-1">
        <li className="task flex justify-between items-center cursor-pointer break-all">
          <a href="# " className="task p-2 text-sm">
            Some random content
          </a>
          <span className=" edit-task invisible">
            <PencilIcon className=" edit-task invisiblew-3.5 h-3.5 m-1 text-gunmetal-300 " />
          </span>
        </li>
      </ul>
    </div>
  );
};

Task.propTypes = {};

export default Task;
