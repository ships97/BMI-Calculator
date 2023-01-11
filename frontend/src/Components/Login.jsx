import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const [token, setToken] = useState("");
  // console.log(email,password);

  const handleSubmit = () => {
     const payload = {
        email,
        password
     }
      // console.log(payload);
      fetch("http://localhost:8000/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        localStorage.setItem("token", res.token)
        // console.log(res.token);
        alert(res.msg);
        setToken(res.token);
        // navigate("/calculateBMI");
      })
  }

  return (
    <div>
      <h1>Login Page</h1>
      <input type="email" placeholder='email' onChange={(e) => {setEmail(e.target.value)}} />
      <input type="password" placeholder='password' onChange={(e) => {setPassword(e.target.value)}} />
      <button onClick={handleSubmit}>Login</button>
      <div style={{width:"100%", boxSizing:"content-box",overflowY:"scroll",marginTop:"20px",marginBottom:"20px"}}><h3>Token : {token}</h3></div>
      <button><Link style={{textDecoration:"none"}} to={"/calculateBMI"}>Go To Calculate BMI</Link></button>
    </div>
  )
}

export default Login;
