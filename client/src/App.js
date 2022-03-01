import "./App.css";
//Router
import { BrowserRouter, Route } from "react-router-dom";
//redux
//components
// import Landing from "./components/landing";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* //   <Route path="/" element={<Landing />} />
    //   <Route path="/signUp" element={<SignUp />} />
    //   <Route path="/login" element={<Login />} /> */}
    </BrowserRouter>
  );
}

export default App;
