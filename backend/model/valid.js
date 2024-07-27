const mongoose=require("mongoose");

const validSchma= new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
        unique:true
    },
    OTP:{
        type:Number,
        
    }
})