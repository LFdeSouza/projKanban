import "./App.css";
//Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import store from "./redux/store";
//components
// import SignUp from "./components/SignUp";
import Landing from "./components/landing/Landing";
import Login from "./components/userAuth/Login";
import Navbar from "./components/navbar/Navbar";
import Board from "./components/boards/BoardPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/board" element={<Board />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
