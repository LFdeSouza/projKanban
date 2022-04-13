//react
import { useEffect } from "react";
//css
import "./App.css";
//Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/auth";
//components
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/userAuth/Login";
import SignUp from "./components/userAuth/SignUp";
import Navbar from "./components/navbar/Navbar";
import Board from "./components/boards/BoardPage";
import TaskForm from "./components/forms/TaskForm";
import PrivateRoute from "./components/userAuth/PrivateRoute";

function App() {
  const isTaskFormOpen = useSelector((state) => state.modal.editTaskModal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/board" element={<Board />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      {isTaskFormOpen && <TaskForm />}
    </BrowserRouter>
  );
}

export default App;
