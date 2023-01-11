import React, { useState } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);

  let token = localStorage.getItem("token");
  // console.log("Token",token);

  const handleSubmit = () => {
      const payload = {
          token
      }
        console.log(payload);
        fetch("http://localhost:8000/getCalculation",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.history);
          setHistory(res.history);
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong, please login again");
        })
  }

  return (
    <div>
      <h1>User History</h1>
      <button onClick={handleSubmit}>Get Users History</button>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px",marginTop:"20px"}}>
        {history.map((item,id) => {
          return (
            <div key={id} style={{borderRadius:"10px",boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"}}>
              <h3>Id: {item._id}</h3>
              <h3>Height: {item.height}</h3>
              <h3>Weight: {item.weight}</h3>
              <h3>BMI: {item.BMI}</h3>
              <h3>Created At: {item.createdAt}</h3>
            </div>
          )})}
      </div>
    </div>
  )
}

export default History;
