import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // console.log(name,email,password);

  const handleSubmit = () => {
     const payload = {
        name,
        email,
        password
     }
      // console.log(payload);
      fetch("http://localhost:8000/signup",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert(res.msg);
        navigate("/login");
      })
  }

  return (
    <div>
      <h1>Signup Page</h1>
      <input type="text" placeholder='name' onChange={(e) => {setName(e.target.value)}} />
      <input type="email" placeholder='email' onChange={(e) => {setEmail(e.target.value)}} />
      <input type="password" placeholder='password' onChange={(e) => {setPassword(e.target.value)}} />
      <button onClick={handleSubmit}>SignUp</button>
    </div>
  )
}

export default Signup;
