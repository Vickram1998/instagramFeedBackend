const mongoose= require('mongoose')

const Schema=mongoose.Schema;

const Userschema= new Schema({
    name:{type:String},
    userID:{type:String, require:true,unique:true} ,
    email:{type:String,require:true,unique:true },
    phone:{type:String,require:true,unique:true },
    gender:{type:String,require:true },
    password:{type:String},
},{timestamps:true})

const User = mongoose.model("User",Userschema)
 
module.exports=User