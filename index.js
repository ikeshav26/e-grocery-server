import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/ConnectDb.js';
import userRoutes from './routes/User.route.js';
import sellerRoutes from './routes/Seller.route.js';
import productRoutes from './routes/Product.route.js';
import cartRoutes from './routes/Cart.route.js';
import { connectCloudinary } from './config/Cloudinary.js';
dotenv.config();


const app=express();
connectDB()
connectCloudinary();


app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api/user',userRoutes);
app.use('/api/seller',sellerRoutes)
app.use('/api/product',productRoutes);
app.use('/api/cart',cartRoutes);


app.listen(process.env.PORT,()=>(
    console.log(`Server is running on port ${process.env.PORT}`
)))