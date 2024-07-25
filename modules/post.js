const mongoose =require("mongoose")

const Schema =mongoose.Schema;
 
const postSchema=new Schema({
    author: { type: String, required: true },
    location: { type: String, required: true }, 
    likes: { type: Number, default: 0 },
    description: { type: String, required: true },
    postImage: { type: String, required: true },
    date: { type: Date, default: Date.now },
    username:{type:String, ref:"User"},
    user:{type:Schema.Types.ObjectId, ref:"User"}
},{timestamps:true})

const PostUser=mongoose.model("PostUser",postSchema)

module.exports= PostUser;