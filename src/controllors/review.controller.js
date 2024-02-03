import { Review } from "../models/review.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const addReviewForProduct=asyncHandler(async(req,res)=>{
    const {userId,productId,comment,rating}=req.body

    if (!userId||!productId||!comment||!rating) {
        throw new ApiError(400,"Fields are required")
    }

  const review=await Review.create({
        user:userId,
        product:productId,
        comment,rating
    })

   await review.save()
return res
.status(200)
.json(new ApiResponse(200,review,"review created"))


})
const getAllReviews=asyncHandler(async(req,res)=>{
    const productId=req.params.productId
   const review=await Review.findOne({product:productId}).populate("user product")

   return res
   .status(200)
   .json(new ApiResponse(200,review,"Review of product"))

})
export {addReviewForProduct,getAllReviews}