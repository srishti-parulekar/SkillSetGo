import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home"; 
import Login from "../pages/Login";
import InterviewerDashboard from "../pages/RoleDashboards/InterviewerDashboard";
import ApplicantDashboard from "../pages/RoleDashboards/ApplicantDashboard";
import HiringManagerDashboard from "../pages/RoleDashboards/HiringManagerDashboard";
import AdminDashboard from "../pages/RoleDashboards/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/interviewerdashboard" element={<InterviewerDashboard />} /> 
      <Route path="/applicantdashboard" element={<ApplicantDashboard />} /> 
      <Route path="/hiringmanagerdashboard" element={<HiringManagerDashboard />} /> 
      <Route path="/admindashboard" element={<AdminDashboard />} /> 
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
};

export default AppRoutes;
