import mongoose from "mongoose";


const resumeSchema =new mongoose.Schema({
     userId:{type:String,required:true,unique:true},
     resumeData:{type:mongoose.Schema.Types.Mixed,required:true},
},{
    timestamps:true,    
})

export const Resume=mongoose.model("Resume",resumeSchema);