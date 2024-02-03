import { Category } from "../models/category.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createCategories=asyncHandler(async(req,res)=>{
    const {name,description}=req.body
    if (!name&&!description) {
        throw new ApiError(400,"fields required")
    }

  const existedCategory=await Category.findOne(
        {
             $or:[
                {name}
                        ]   
        }
    )
if (existedCategory) {
    throw new ApiError(400,"Category already existed")
}
  const category=await Category.create({
        name,description
    })

    return res
    .status(200)
    .json(new ApiResponse(200,category,"Category created"))

})
const getAllCategories=asyncHandler(async(req,res)=>{
   const categories=await Category.find()

   return res
   .status(200)
   .json(new ApiResponse(200,categories,"Get all Categories"))
})
const getCategoryById=asyncHandler(async(req,res)=>{
    const categoriesId=req.params.categoriesId

  const categories=await Category.findById(categoriesId)
  return res
  .status(200)
  .json(new ApiResponse(200,categories,"Get Category By Id"))
})

const updateCategory=asyncHandler(async(req,res)=>{
    const {name,description}=req.body
    const categoriesId=req.params.categoriesId
    if (!name && !description) {
        throw new ApiError(400,"fields required")
    }
 const categories=await Category.findByIdAndUpdate(
        categoriesId,
        {
            $set:{
                name
            }
        },
        {
            new:true
        }
    ).select("-description")

    return res
    .status(200)
    .json(new ApiResponse(200,categories,"Category updated Successfully"))

})

const deleteCategory=asyncHandler(async(req,res)=>{
    const categoriesId=req.params.categoriesId

  const categories=await Category.findByIdAndDelete(categoriesId)
  return res
  .status(200)
  .json(new ApiResponse(200,categories,"Category Deleted"))
})


export {createCategories,getAllCategories,getCategoryById,updateCategory,deleteCategory}