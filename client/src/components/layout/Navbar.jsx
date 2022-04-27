import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BadgeCheckIcon, MenuIcon } from "@heroicons/react/outline";
import { logout } from "../../redux/actions/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = (e) => {
    const menu = document.querySelector("#main-menu");
    menu.classList.toggle("translate-y-[236px]");
  };

  const authMenu = isAuthenticated && (
    <ul className="hidden md:flex items-end px-3 lg:px-10 md:space-x-3 md:static absolute top-[56px] left-0 w-full py-5 md:py-0 bg-gunmetal-300 md:bg-transparent transition-all duration-300">
      <img className="h-7 w-7 rounded-full" src={user.avatar} alt="Avatar" />
      <li className="my-3 md:my-0 mx-3 ">
        <p className="text-gray-100 text-lg">{user.name}</p>
      </li>
      <li className="my-3 md:my-0 mx-3 ">
        <button
          className="text-gray-100 text-lg hover:underline hover:text-gunmetal-400 md:hover:text-gunmetal-200 duration-200"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </li>
    </ul>
  );

  const guestMenu = (
    <ul className="hidden md:flex px-3 lg:px-10 md:space-x-3 md:static absolute top-[56px] left-0 w-full py-5 md:py-0 bg-gunmetal-300 md:bg-transparent transition-all duration-300">
      <li className="my-3 md:my-0 mx-3 ">
        <Link
          to="/login"
          className="text-gray-100 text-lg hover:underline hover:text-gunmetal-400 md:hover:text-gunmetal-200 duration-200"
        >
          Login
        </Link>
      </li>
      <li className="my-3 md:my-0 mx-3 ">
        <Link
          to="/signup"
          className="text-gray-100 text-lg hover:underline hover:text-gunmetal-400 md:hover:text-gunmetal-200 duration-200"
        >
          SignUp
        </Link>
      </li>
    </ul>
  );
  return (
    <div className="bg-gunmetal-500">
      <div className="p-3 mx-auto w-full">
        <div className="flex items-end justify-between">
          <div className="flex items-end">
            <span className="flex justify-center items-center space-x-2 cursor-pointer">
              <BadgeCheckIcon className="h-8 w-8 text-indigo-500" />
              <p className="text-2xl text-gray-100 font-extrabold">Kanban</p>
            </span>
            <ul
              id="main-menu"
              className="md:flex -z-10 md:z-10 px-3 lg:px-10 md:space-x-1 md:static absolute left-0 w-full py-5 md:py-0 bg-gunmetal-300 md:bg-transparent transition-top duration-300"
            >
              <li className="my-3 md:my-0 mx-3">
                <Link
                  to="/dashboard"
                  className="text-gray-100 text-lg hover:underline hover:text-gunmetal-400 md:hover:text-gunmetal-200 duration-200"
                >
                  Boards
                </Link>
              </li>
              <hr className="hr md:hidden" />
              <li className="my-3 md:my-0 mx-3 md:hidden">
                <Link
                  to="/login"
                  className="text-gray-100 text-lg hover:underline hover:text-gunmetal-400 duration-200"
                >
                  Login
                </Link>
              </li>
              <li className="my-3 md:my-0 mx-3 md:hidden">
                <Link
                  to="/"
                  className="text-gray-100 text-lg hover:underline hover:text-gunmetal-400 duration-200"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          <div>{isAuthenticated ? authMenu : guestMenu}</div>
          <button className="md:hidden px-10" onClick={() => toggleMenu()}>
            <MenuIcon className="w-8 h-8 text-gunmetal-100" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
