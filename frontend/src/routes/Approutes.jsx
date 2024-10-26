import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home"; 
import Login from "../pages/Login";
//import About from "../pages/pagename"; 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
