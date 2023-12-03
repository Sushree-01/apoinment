const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    email:String,
    password:String,
    confPassword:String
})
const userModel=mongoose.model("user",userSchema);
module.exports=userModel;