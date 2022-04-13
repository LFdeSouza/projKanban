import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoard, getBoards } from "../../redux/actions/auth";

const Dashboard = () => {
  const boards = useSelector((state) => state.auth.user.boards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  return (
    <section className="absolute inset-0 bg-gunmetal-300 -z-10">
      <div className="w-10/12 mt-28 mx-auto">
        <h1 className="text-2xl font-semibold text-white">Boards</h1>
        <ul className="my-4 grid grid-cols-6 gap-6">
          {boards &&
            boards.forEach((board) => (
              <li className="h-24 w-44 bg-indigo-700 rounded hover:bg-indigo-600 cursor-pointer shadow-lg">
                <p className="p-4 font-semibold text-white">{board.title} </p>
              </li>
            ))}
          <li
            className="h-24 w-44 bg-indigo-700 rounded hover:bg-indigo-600 cursor-pointer shadow-lg"
            onClick={() => dispatch(createBoard("newBoard"))}
          >
            <p className="p-4 font-semibold text-white">+ Create new board</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Dashboard;
