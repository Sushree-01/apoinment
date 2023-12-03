const express=require("express");
const DoctorModel=require("../model/doctor.model");
const doctorRouter=express.Router()
const {authentication}=require("../middleware/auth.midleware");
doctorRouter.get("/",authentication,async(req,res)=>{
    const query={};
    try {
        const doctors=await DoctorModel.find(query);
        res.send(doctors);

    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Something went wrong..Check Again"});
    }
})

doctorRouter.post("/add",authentication,async(req,res)=>{
    const payload=req.body;
    try {
        const newDoctor=new DoctorModel(payload);
        await newDoctor.save();
        res.send("Doctor created successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"something went wrong..check again"});
    }
});

doctorRouter.get("/:id",authentication,async(req,res)=>{
    try {
        const {id}=req.params;
        const doctors=await DoctorModel.findById(id);
        if(!doctors){
            res.status(404).send({message:"doctor not found"})
        }else{
            res.send({doctors})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:"Something went wrong"})
    }
});

doctorRouter.patch("/update/:id",authentication,async(req,res)=>{
    const {id}=req.params;
    const payload=req.body;
    try {
        const doctors=await DoctorModel.findById(id);
        const doctoeID_in_post=doctors.userID;
        const doctoeID_in_req=req.body.userID;
        if(doctoeID_in_post!==doctoeID_in_req){
            res.status(401).send({message:"You are not authorized"});
        }else{
            await DoctorModel.findByIdAndUpdate(id,payload);
            res.send("updated post successfully");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:"something went wrong"})
    }
});

doctorRouter.delete("/delete/:id",authentication,async(req,res)=>{
    const {id}=req.params;
    try {
        const doctor=await DoctorModel.findById(id);
        const doctoeID_in_post=doctor.userID;
        const doctoeID_in_req=req.body.userID;
        if(doctoeID_in_post!==doctoeID_in_req){
            res.status(401).send({message:"You are not authorized"})
        }else{
            await DoctorModel.findByIdAndDelete(id);
            res.send("Delete post successfully")
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:"something went wrong"})
    }
});

doctorRouter.get("/filter",authentication,async(req,res)=>{
    try {
        const query=req.query.value;
        const store=query.toLowerCase();
        const filterData=await DoctorModel.find({specialization:store});
        res.json(filterData);
    } catch (error) {
        res.status(500).json({message:"something goes wrong",error:error.message})
    }
});

doctorRouter.get("/sort",authentication,async(req,res)=>{
    try {
        const query=req.query.value;
        if(query==="asc"){
            let sortData=await DoctorModel.find().sort({data:1})
            res.json(sortData);
        }else if(query==="desc"){
            let sortData=await DoctorModel.find().sort({data:-1});
            res.json(sortData);
        }
    } catch (error) {
        res.status(500).json({message:"something goes wrong",error:error.message});
    }
});

doctorRouter.get("/search",authentication,async(req,res)=>{
    try {
        const query=req.query.value;
        const store=query.toLowerCase();
        console.log(query,store);

        let searchData=await DoctorModel.find({name:store});
        res.json(searchData);
    } catch (error) {
        res.status(500).json({message:"something goes wrong",error:error.message})
    }
})

module.exports={doctorRouter}