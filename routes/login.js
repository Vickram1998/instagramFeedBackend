const express=require("express")
const {body,validationResult}=require('express-validator')
const User= require('../modules/user')
const PostUser= require("../modules/post")
const bcrypt = require('bcrypt'); 
const { message } = require("statuses");
var jwt = require('jsonwebtoken');
const secret ="SERVER"


const router=express.Router();

router.get('/register',async(req,res)=>{

    const user =await User.find()
  
    res.json({
        status:'success',
        user

    })
})


router.post('/register', body("email").isEmail(), body("name").isAlpha() ,async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name,userID,email,phone,gender,password} =req.body
    try{
        bcrypt.hash(password, 10, async function(err, hash) {
            if(err){
               return  res.status(500).json({
                    status:'failed',    
                    message:err.message
                })
            }
            try {
                const user = await User.create({
                    name,
                    userID,
                    email,
                    phone,
                    gender,
                    password: hash
                });
                res.json({
                    status: 'success',
                    message: 'registration success',
                    user
                });
            } catch (error) {
                res.status(500).json({
                    status: 'failed',
                    message: error.message
                });
            }
        })

    }catch(e){
        res.status(400),
        res.json({message:e.message})
    }
    

})
 router.post("/login",async(req,res)=>{
        const{ UserCredentail,password}=req.body;
    
        try{
        const user = await User.findOne({$or:[
            {email:UserCredentail},
            {userID:UserCredentail}
        ]}) 
        if(!user){
            return res.status(400).json({
                staus:"failed",
                message:"User Not Registerd"})
        }
   
        bcrypt.compare(password, user.password,function (err,result){
            
            if(err){
                return res.status(500).json({
                    status:'failed',
                    message:err.message
                })
            }
            if(result){
                const ID=user.userID 
                const token =jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    user: user._id
                }, secret);
                res.json({
                    status:'Sucess',
                    ID,
                    token
                })
            }
        })
        
    }catch(e){
        res.status(400).json({message:e.message})
    }
 })

module.exports= router