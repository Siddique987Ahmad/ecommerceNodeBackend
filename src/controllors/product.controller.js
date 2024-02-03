import { Product } from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createProducts=asyncHandler(async(req,res)=>{

    const {name,description,price,quantity,size,brand,color}=req.body
    if([name, description, price, quantity, size, brand, color].some(
        (field) => typeof field === "string" && field.trim() === ""
      ))
    {
        throw new ApiError(400,"fields are required")
    }
//console.log(quantity)
 const existedProduct=await Product.findOne({
        $or:[
            {name}
        ]
    })

    if (existedProduct) {
        throw new ApiError(400,"Product already existed")
    }

  const product= await Product.create({
        name,description,price,quantity,size,brand,color
    })
//console.log(product.quantity)
    return res
    .status(200)
    .json(new ApiResponse(200,product,"Products created successfully"))

})
const getAllProducts=asyncHandler(async(req,res)=>{
    const product=await Product.find()

    return res
    .status(200)
    .json(new ApiResponse(200,product,"All products here successfully"))

})
const getProductById=asyncHandler(async(req,res)=>{
    const productId=req.params.productId

   const product=await Product.findById(productId)
   return res
   .status(200)
   .json(new ApiResponse(200,product,"Get products by Id here successfully"))

})
const updateProduct=asyncHandler(async(req,res)=>{

    const {name,description,price,quantity,size,brand,color}=req.body
    const productId=req.params.productId;
    if([name, description, price, quantity, size, brand, color].some(
        (field) => typeof field === "string" && field.trim() === ""
      ))
    {
        throw new ApiError(400,"fields are required")
    }

  const product=await Product.findByIdAndUpdate(
        productId,
        {
           $set:{
            name,description,price,quantity,size,brand,color
           }

    },
    {
        new:true
    }
    
    )
return res
.status(200)
.json(new ApiResponse(200,product,"Updated product with an Id Successfully"))

})

const deleteProduct=asyncHandler(async(req,res)=>{
    const productId=req.params.productId
   const product=await Product.findByIdAndDelete(productId)

   return res
   .status(200)
   .json(new ApiResponse(200,product,"Product deleted successfully"))

})


export {createProducts,getAllProducts,getProductById,updateProduct,deleteProduct}