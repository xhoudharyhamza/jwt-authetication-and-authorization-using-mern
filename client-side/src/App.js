import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";
import { Logout } from "./components/Logout";
import AuthenticationContext from "./components/context/AuthenticationContext";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <AuthenticationContext>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </AuthenticationContext>
    </>
  );
}

export default App;
