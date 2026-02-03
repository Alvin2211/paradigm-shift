import mongoose from "mongoose";


const resumeSchema =new mongoose.Schema({
     userId:{type:String,required:true,unique:true},
     resumeData:{type:Object,required:true},
},{
    timestamps:true,    
})

export const Resume=mongoose.model("Resume",resumeSchema);