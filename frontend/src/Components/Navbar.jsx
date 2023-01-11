import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div style={{backgroundColor:"aqua", height:"50px", display:"flex", justifyContent:"space-evenly"}}>
        <Link style={{marginTop:"10px",fontSize:"19px",textDecoration:"none"}} to={"/"}>Home</Link>
        <Link style={{marginTop:"10px",fontSize:"19px",textDecoration:"none"}} to={"/signup"}>Signup</Link>
        <Link style={{marginTop:"10px",fontSize:"19px",textDecoration:"none"}} to={"/login"}>Login</Link>
        <Link style={{marginTop:"10px",fontSize:"19px",textDecoration:"none"}} to={"/getProfile"}>Profile</Link>
        <Link style={{marginTop:"10px",fontSize:"19px",textDecoration:"none"}} to={"/calculateBMI"}>Calculate BMI</Link>
        <Link style={{marginTop:"10px",fontSize:"19px",textDecoration:"none"}} to={"/getCalculation"}>History</Link>
        <Link style={{marginTop:"10px",fontSize:"19px",textDecoration:"none"}} to={"/logout"}>Logout</Link>
      </div>
    </>
  )
}

export default Navbar;
