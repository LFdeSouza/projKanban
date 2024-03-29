import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadBoards } from "../../redux/actions/auth";
import BoardForm from "../forms/BoardForm";
import Spinner from "../layout/Spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.auth.user.boards);
  const isLoading = useSelector((state) => state.auth.user.isLoading);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(loadBoards());
  }, [dispatch]);

  return (
    <section className="absolute inset-0 bg-gunmetal-300 -z-10">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-10/12 mt-28 mx-auto">
          <h1 className="text-2xl font-semibold text-white">Boards</h1>
          <ul className="my-4 grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {boards.map((board, index) => {
              return (
                <li
                  className="h-32 p-4 font-semibold text-white bg-indigo-700 rounded hover:bg-indigo-600 cursor-pointer shadow-lg"
                  key={index}
                  id={board._id}
                  onClick={(e) => navigate(`/board/${e.target.id}`)}
                >
                  {board.title}
                </li>
              );
            })}
            <li
              className="h-32 bg-indigo-700 rounded p-4 text-md font-semibold text-white hover:bg-indigo-600 cursor-pointer shadow-lg"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              + Create new board
            </li>
          </ul>
          {isFormOpen ? <BoardForm closeForm={setIsFormOpen} /> : null}
        </div>
      )}
    </section>
  );
};

export default Dashboard;
