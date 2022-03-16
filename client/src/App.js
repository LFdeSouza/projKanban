//react
import { useState } from "react";
//css
import "./App.css";
//Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
//components
import Landing from "./components/landing/Landing";
import Login from "./components/userAuth/Login";
import Navbar from "./components/navbar/Navbar";
import Board from "./components/boards/BoardPage";
import TaskForm from "./components/forms/TaskForm";

function App() {
  const isTaskFormOpen = useSelector((state) => state.modal.editTaskModal);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/board" element={<Board />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {isTaskFormOpen && <TaskForm />}
    </BrowserRouter>
  );
}

export default App;
