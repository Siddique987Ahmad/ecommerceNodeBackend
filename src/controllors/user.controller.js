import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import Jwt  from "jsonwebtoken";

const generateAccessAndRefreshToken=async(userId)=>{
try {
    
   const user=await User.findById(userId)
   const accessToken=user.generateAccessToken()
   const refreshToken=user.generateRefreshToken()
   user.refreshToken=refreshToken
   await user.save({validateBeforeSave:false})
   return {accessToken,refreshToken}
} catch (error) {
    throw new ApiError(500,"something wrong while access and refresh token")
}
}

const registerUser=asyncHandler(async(req,res)=>{
    const {userName,email,password}=req.body

    if([email, userName, password].some((field) => field.trim() === ""))
    {
        throw new ApiError(400,"fields are required")
    }
   const existedUser=await User.findOne({
        $or:[
           { userName},{email}
        ]
     })
     if (existedUser) {
        throw new ApiError(400,"User already existed")
     }


   const user=await User.create({
        email,userName,password
     })

    const createUser=await User.findById(user._id).select("-password -refreshToken")

     return res
     .status(200)
     .json(new ApiResponse (200,createUser,"User created successfully"))
})

// const loginUser=asyncHandler(async(req,res)=>{
//     const {email,userName,password}=req.body
//     if (!email && !userName) {
//         throw new ApiError(400,"Email or UserName required")
//     }

//    const user=await User.findOne({
//         $or:[{email},{userName}]
//     })
//     if (!user) {
//         throw new ApiError(400,"user or email not here")
//     }

//    const isPasswordValid= await user.isPasswordCorrect(password)

//    if (!isPasswordValid) {
//     throw new ApiError(400,"Password is not valid")
//    }

//    const {accessToken,refreshToken}= generateAccessAndRefreshToken(
//        user._id
//    )

//  const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

//  const options={
//     httpOnly:true,
//     secure:true
//  }
//  return res
//  .status(200)
//  .cookie("accessToken",accessToken,options)
//  .cookie("refreshToken",refreshToken,options)
//  .json(
//     new ApiResponse(200,{user:loggedInUser,accessToken,refreshToken},"User logged in successfully")
//  )

// })
const loginUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
  
    //console.log(email);
  
    if (!userName && !email) {
      throw new ApiError(400, "Username or email required");
    }
  
    const user = await User.findOne({
      $or: [{ userName }, { email }],
    });
    //console.log(username);
    if (!user) {
      throw new ApiError(400, "user not exist");
    }
  
    const isPasswordValid = await user.isPasswordCorrect(password);
  
    if (!isPasswordValid) {
      throw new ApiError(404, "password not valid");
    }
  
    const { accessToken, refreshToken } = await  generateAccessAndRefreshToken(
      user._id
    );
  
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged in successfully"
        )
      );
  });
  const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined

            },
          
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true
    }
    return res
    .cookie("accessToken",options)
    .cookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logout successfuly"))
  })
export {registerUser,loginUser,logoutUser}