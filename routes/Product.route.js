import express from 'express';
import { sellerAuth } from '../middlewares/Seller.Auth.js';
import { addProduct, changeStock, getProduct, getProducts } from '../controller/Product.controller.js';
import {upload} from '../config/multer.js'


const router=express.Router();

router.post('/add',upload.array('images'),sellerAuth, addProduct);
router.get('/list',getProducts)
router.get('/id', getProduct);
router.post('/stock',sellerAuth,changeStock)

export default router;