import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
      
    },
    verified: {
         type: Boolean, 
         default: false },
    otp:{
        type:String,
      
    },
    otpExpiry:{
        type:Date,
        default: null 
        
    },
    phoneNumber: {
        type: Number
    },
    role:{
        type:String,
        enum:['student','recruiter'],
       
    },
  

    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, // URL to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePhoto:{
            type:String,
            default:""
        }
    },
},{timestamps:true});
export const User = mongoose.model('User', userSchema);