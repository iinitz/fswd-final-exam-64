import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login"
import Home from "./pages/Home"
function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
