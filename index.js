import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();


const app=express();


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


app.listen(process.env.PORT,()=>(
    console.log(`Server is running on port ${process.env.PORT}`
)))