import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import CalculateBMI from './CalculateBMI';
import Logout from './Logout';
import Profile from './Profile';
import History from './History';
import Home from './Home';

function AllRoutes() {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/getProfile" element={<Profile />} />
          <Route path="/calculateBMI" element={<CalculateBMI />} />
          <Route path="/getCalculation" element={<History />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
    );
  }
  
  export default AllRoutes;