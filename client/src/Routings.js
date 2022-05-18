import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";

const Routings = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Navigate replace to="/home" />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>

      </Routes>
    </Router>
  );
};
export default Routings;
