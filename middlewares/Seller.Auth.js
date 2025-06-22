import jwt from 'jsonwebtoken';


export const sellerAuth=async(req,res,next)=>{
    try{
        const sellerToken=req.cookies.sellerToken;
    if(!sellerToken){
        return res.status(400).json({message:"Unauthorized access, no token"});
    }
    const decoded=jwt.verify(sellerToken, process.env.JWT_SECRET);
    if(decoded.email===process.env.SELLER_EMAIL){
        next();
    }
    }
    catch(error){
        console.error('Seller authentication error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}