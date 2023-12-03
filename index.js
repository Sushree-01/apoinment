const express=require("express");
const connection=require("./config/db");
const {userRouter}=require("./route/user.Route");
const {doctorRouter}=require("./route/doctor.Route")
const {authentication}=require("./middleware/auth.midleware");

require("dotenv").config();
const cors=require("cors");
const app=express();
app.use(cors());
const port=process.env.port||8080;

app.use(cors());
app.get("/",(req,res)=>{
    res.send("Welcome to home page of doctors backend")
})

app.use("/user",userRouter);
app.use("/appoinments",doctorRouter);
app.listen(port,async()=>{
    try {
        await connection;
        console.log("connection successfully to db");
    } catch (error) {
        console.log(error);
    }
    console.log("port running at 8080");
})