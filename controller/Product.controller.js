import Product from "../models/Product.model.js";
import {v2 as cloudinary} from 'cloudinary';



//create product : /api/product/add
export const addProduct=async(req,res)=>{
    try{
        const {name,description,price,offerPrice,category}=req.body;
        const images=req.files;

        let imageUrl=await Promise.all(images.map((item)=>{
            let result=cloudinary.uploader.upload(item.path, {
                resource_type: "image"
            });
            return result;
        }));

        await Product.create({
            name,
            description,
            price,
            offerPrice,
            image: imageUrl,
            category
        })
    }
    catch(error){
        console.error("Error adding product:", error);
        res.status(500).json({message: "Internal server error"});
    }
}


//get all products  :/api/product/get
export const getProducts=async(req,res)=>{
    try{
        const products=await Product.find({}).sort({createdAt: -1})
        res.status(200).json({message:"Products fetched successfully",products});
    }
    catch(error){
        console.error("Error fetching products:", error);
        res.status(500).json({message: "Internal server error"});
    }
}


//get product by id : /api/product/:id
export const getProduct=async(req,res)=>{
    try{
        const {id}=req.body;
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "Product fetched successfully", product});
    }catch(error){
        console.error("Error fetching product by ID:", error);
        res.status(500).json({message: "Internal server error"});
    }
}



//change stock :/api/product/stock
export const changeStock=async(req,res)=>{
    try{
        const {id,inStock}=req.body;
        const product=await Product.findByIdAndUpdate(id, {inStock}, {new: true});
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "Stock updated successfully", product});
    }
    catch(error){
        console.error("Error changing stock:", error);
        res.status(500).json({message: "Internal server error"});
    }
}