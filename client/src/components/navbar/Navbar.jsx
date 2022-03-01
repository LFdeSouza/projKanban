import React from "react";
import { Link } from "react-router-dom";
import { BadgeCheckIcon, MenuIcon } from "@heroicons/react/solid";

const Navbar = () => {
  return (
    <div className="relative">
      <div className="flex justify-start gap-5 py- 3 px-10 bg-gunmetal-400 shadow">
        <div className="py-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-50 font-bold text-lg"
          >
            <span>
              <BadgeCheckIcon className="text-indigo-500 w-10 h-10" />
            </span>
            Kanban
          </Link>
        </div>
        <button className="text-white cursor-pointer md:hidden">
          <span>
            <MenuIcon className="text-gray-200 h-7" />
          </span>
        </button>
      </div>

      <ul className="py-5 bg-gunmetal-100 absolute w-2/3 p-5 shadow ">
        <p className="text-gunmetal-400 border-b border-b-gunmetal-200 p-2 text-center">
          Menu
        </p>
        {/* usernave nav */}
        <li className="text-gunmetal-500 p-2 text-center">
          <Link to="/">Boards</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
