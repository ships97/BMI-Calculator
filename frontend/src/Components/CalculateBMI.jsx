import React, { useState } from 'react';

const CalculateBMI = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [bmivalue, setBmivalue] = useState("");
  // console.log(email,password);

  const handleSubmit = () => {
     const payload = {
        height,
        weight
     }
      // console.log(payload);
      fetch("http://localhost:8000/calculateBMI",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`  
        },
        body: JSON.stringify(payload)
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBmi(res.BMI);
        if(res.BMI < 18.5){
          // alert("You are Underweight");
          setBmivalue("You are Underweight");
        }
        else if(res.BMI >= 18.5 && res.BMI <= 24.9){
          // alert("You are Normal");
          setBmivalue("You are Normal");
        }
        else if(res.BMI >= 25 && res.BMI <= 29.9){
          // alert("You are Overweight");
          setBmivalue("You are Overweight");
        }
        else if(res.BMI >= 30){
          // alert("You are Obese");
          setBmivalue("You are Obese");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Please Login First");
      })
  }

  return (
    <div>
      <h1>BMI Calculator</h1>
      <input type="number" placeholder='height in feet' onChange={(e) => {setHeight(e.target.value)}} />
      <input type="number" placeholder='weight in kg' onChange={(e) => {setWeight(e.target.value)}} />
      <button onClick={handleSubmit}>Calculate BMI</button>
      <h2>Calculated BMI : {bmi}</h2>
      <h2>{bmivalue}</h2>
    </div>
  )
}

export default CalculateBMI;
