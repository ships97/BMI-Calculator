const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connection } = require("./config/db");
const { UserModel } = require("./models/UserModel");
require("dotenv").config();
const { authentication } = require("./middlewares/authentication");
const { BMIModel } = require("./models/BMIModel");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Home page");
});

app.post("/signup", async (req, res) => {
    const {name, email, password} = req.body;
    console.log(name, email, password);
    const isUser = await UserModel.findOne({email});
    if(isUser){
        res.send({"msg" : "User already exists, Try logging in"});
    }
    else{
        bcrypt.hash(password, 4, async function (err, hash){
            if(err){
                res.send({"msg" : "Something went wrong, please try again later"});
            }
            const new_user = new UserModel({
                name,
                email,
                password : hash
            });
            try{
                await new_user.save();
                res.send({"msg" : "Signup successfull"});
            }
            catch(err){
                res.send({"msg" : "Something went wrong, please try again"});
            }
        });
    }
});

app.post("/login", async (req, res) =>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    const hashed_password = user.password;
    const user_id = user._id;
    console.log(user);
    console.log(user_id);
    bcrypt.compare(password, hashed_password, function(err, result){
        if(err){
            res.send({"msg" : "Somenthing went wrong"});
        }
        if(result){
            const token = jwt.sign({user_id}, process.env.SECRET_KEY);
            res.send({"msg": "Login successfull" , token});
        }
        else{
            res.send({"msg" : "Login failed"});
        }
    })
});

app.get("/getProfile", authentication, async (req, res) => {
    const {user_id} = req.body;
    const user = await UserModel.findOne({_id : user_id});
    // console.log(user);
    const {name, email} = user;
    res.send({name, email});
});

app.post("/calculateBMI", authentication, async (req, res) => {
    const {height, weight, user_id} = req.body;
    const height_in_metre = Number(height)*0.3048;
    const BMI = Number(weight)/(height_in_metre)**2;
    const new_bmi = new BMIModel({
        BMI,
        height : height_in_metre,
        weight,
        user_id,
    })
    await new_bmi.save();
    res.send({BMI});
});

app.get("/getCalculation", authentication, async (req, res) => {
    const {user_id} = req.body;
    const all_bmi = await BMIModel.find({user_id : user_id});
    res.send({history: all_bmi});
});

app.listen(8000, async () => {
    try{
        await connection;
        console.log("Connection to DB successfull");
    }
    catch(err){
        console.log("Error connecting to DB");
        console.log(err);
    }
    console.log("Listening at port 8000");
});