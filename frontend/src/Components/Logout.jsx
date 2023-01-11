import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    // localStorage.setItem("token", "");
    localStorage.removeItem("token");
    alert("Logged Out Successfully");
    navigate("/");
  }

  return (
    <div>
      <h1>Logout Page</h1>
      <button onClick={handleSubmit}>Logout</button>
    </div>
  )
}

export default Logout;
