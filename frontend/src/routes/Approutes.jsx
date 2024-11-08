import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home"; 
import Login from "../pages/Login";
import InterviewerDashboard from "../pages/InterviewerDashboard/InterviewerDashboard";

//import About from "../pages/pagename"; 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/interviewerdashboard" element={<InterviewerDashboard />} /> 
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
