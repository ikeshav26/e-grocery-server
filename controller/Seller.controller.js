import jwt from 'jsonwebtoken';


//seller login: /api/seller/login
export const LoginSeller=async(req,res)=>{
    try{
        const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    if(email!==process.env.SELLER_EMAIL || password!==process.env.SELLER_PASSWORD){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const sellertoken=jwt.sign({email},process.env.JWT_SECRET,{
        expiresIn:"7d"})
    res.cookie("sellerToken",sellertoken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000 
    })    
    res.status(200).json({message:"Seller logged in successfully",email});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}



//seller logout : /api/seller/logout
export const LogoutSeller=async(req,res)=>{
    try{
        res.clearCookie("sellerToken",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict"
        });
        return res.status(200).json({message:"Seller logged out successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}