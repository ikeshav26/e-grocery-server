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
        res.status(201).json({message:"User registered successfully",user:newUser});
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}


//login user: /api/user/login
export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const findUserByEmail=await User.findOne({email})
        if(!findUserByEmail){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isPasswordValid=await bcrypt.compare(password,findUserByEmail.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token=jwt.sign({
            id:findUserByEmail._id
        },process.env.JWT_SECRET,{
            expiresIn:"7d"
        })

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000 
        })

        res.status(200).json({message:"User logged in successfully",user:findUserByEmail});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}



//logout user: /api/user/logout
export const logoutUser=async(req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict"
        })
        res.status(200).json({message:"User logged out successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}



//authentication isAuthenticated: /api/user/is-auth
export const isAuthenticated=async(req,res)=>{
    try{
        const userId=req.user;
        if(!userId){
            return res.status(401).json({message:"Unauthorized access"});
        }

        const user=await User.findById(userId).select("-password");
        res.status(200).json({message:"User is authenticated",user});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}