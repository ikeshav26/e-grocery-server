import express from 'express';
import { isAuthenticated, loginUser, logoutUser, registerUser } from '../controller/User.controller.js';
import { authUser } from '../middlewares/Auth.js';

const router=express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',authUser,logoutUser)
router.get('/is-auth',authUser,isAuthenticated)

export default router;