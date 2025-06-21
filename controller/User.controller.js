import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//register user: /api/user/register

export const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"All field are required"})
        }

        const existingUser=await User.findOne({email})
        if(existingUser){
            res.status(400).json({message:"User already exists"})
        }

        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            name:name,
            email:email,
            password:hashedPassword
        })
        await newUser.save();


        const token=jwt.sign({
            id:newUser._id
        },process.env.JWT_SECRET,{
            expiresIn:"7d"
        })
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000 
        })
        res.status(201).json({message:"User registered successfully"})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}


