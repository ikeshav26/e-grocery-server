import User from '../models/User.model.js';


// :/api/cart/update
export const updateCart=async(req,res)=>{
    try{
        const userId=req.user;
        const {cartItems}=req.body;
        const updatedUser=await User.findByIdAndUpdate(userId,{cartData:cartItems},{new:true})
        if(!updatedUser){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Cart updated successfully', cartData: updatedUser.cartData });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}