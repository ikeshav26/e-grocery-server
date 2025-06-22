import express from 'express';
import { LoginSeller } from '../controller/Seller.controller.js';

const router=express.Router();

router.post('/login', LoginSeller);

export default router;