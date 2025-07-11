import jwt from 'jsonwebtoken';

export const authUser=(req,res,next)=>{
    try{
        const token=req.cookies.token
        if(!token){
            return res.status(400).json({message:"Unauthorized access, no token "});
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded.id
        next()
    }catch(error){
        console.error('Authentication error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}