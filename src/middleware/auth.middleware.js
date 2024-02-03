import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import  Jwt  from "jsonwebtoken";

export const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        
        const token=req.cookies?.accessToken||req.header
        ("Authorization")?.replace("bearer","")
        if (!token) {
            throw new ApiError(400,"token invalid")
        }

        const decodedInfo=Jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

     const user=await User.findById(decodedInfo?._id).select("-password -refreshToken")
if (!user) {
    throw new ApiError(400,"invalid access token")
}
req.user=user
next()

    } catch (error) {
        throw new ApiError(400,error?.message||"invalid access token")
    }
})