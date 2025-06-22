import express from 'express';
import { LoginSeller, LogoutSeller,isSellerAuthenticated } from '../controller/Seller.controller.js';
import { sellerAuth } from '../middlewares/Seller.Auth.js';


const router=express.Router();

router.post('/login', LoginSeller);
router.get('/logout',sellerAuth, LogoutSeller);
router.get('/is-auth',sellerAuth,isSellerAuthenticated);

export default router;