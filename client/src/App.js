import "./App.css";
//Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
//redux
//components
// import Landing from "./components/landing";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
import Navbar from "./components/navbar/Navbar";
import Board from "./components/boards/BoardPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
