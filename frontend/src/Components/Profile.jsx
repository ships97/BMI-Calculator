import React, { useState } from 'react';

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  let token = localStorage.getItem("token");
  // console.log("Token",token);

  const handleSubmit = () => {
      const payload = {
          token
      }
        console.log(payload);
        fetch("http://localhost:8000/getProfile",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          // console.log(res.name);
          // console.log(res.email);
          setName(res.name);
          setEmail(res.email);
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong, please login again");
        })
  }

  return (
    <div>
      <h1>User Profile</h1>
      <button onClick={handleSubmit}>Get User Details</button>
      <h2>Name : {name}</h2>
      <h2>Email : {email}</h2>
    </div>
  )
}

export default Profile;
