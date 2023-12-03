const mongoose=require("mongoose");
const doctorSchema=new mongoose.Schema({
    name:String,
    image:String,
    specialization:String,
    experience:Number,
    location:String,
    date:Date,
    slots:Number,
    fee:Number,
});

const DoctorModel=mongoose.model("Doctor",doctorSchema);
module.exports=DoctorModel;

// {
//     "name": "Jane Doe",
//     "image": "https://example.com/doctor-image.jpg",
//     "specialization": "Dermatologist",
//     "experience": 10,
//     "location": "Los Angeles",
//     "date": "2023-04-05T12:00:00.000Z",
//       "slots" : 2,
//     "fee": 150
//   },