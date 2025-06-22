import express from 'express';
import { LoginSeller, LogoutSeller } from '../controller/Seller.controller.js';
import { sellerAuth } from '../middlewares/Seller.Auth.js';

const router=express.Router();

router.post('/login', LoginSeller);
router.get('/logout',sellerAuth, LogoutSeller);

export default router;