const express=require("express");
const userModel=require("../model/user.model");
const jwt=require("jsonwebtoken");
const bcryt=require("bcrypt");
require("dotenv").config();

const userRouter=express.Router();
userRouter.post("/signup",async(req,res)=>{
    const {email,password,confPassword}=req.body;
    if(password==confPassword){
        try {
            bcryt.hash(password,5,async(err,security)=>{
                if(err){
                    console.log(err);
                }else{
                    const user=new userModel({
                        email,
                        password:security,
                        confPassword:security,
                    });
                    await user.save();
                    res.json(user);
                }
            });
        } catch (error) {
            res.send({message:"error in registering the user"})
        }
    }else{
        res.send({message:"password and confpassword not matching"})
    }
});

userRouter.post("/login",async(req,res)=>{
    let {email,password}=req,body;
    try {
        let user=await userModel.findOne({email});
        if(user){
            bcryt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token=jwt.sign({authorId:user._id},process.env.key);
                    res.send({msg:"Login Sucessful",token:token});

                }else{
                    res.send({msg:"Invalid Credentials ,please Login Again"})
                }
            })
        }else{
            res.send({msg:"please signup first and proceed"})
        }
    } catch (error) {
        res.send(error);
    }
})
module.exports={userRouter};
