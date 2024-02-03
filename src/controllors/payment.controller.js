import { Payment } from "../models/payment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const initiatePaymentForAnOrder=asyncHandler(async(req,res)=>{
    const {userId,orderId,amount}=req.body

    if (!userId||!orderId||!amount) {
        throw new ApiError(400,"Fields are required")
    }

 const payment=await Payment.create({
        user:userId,
        order:orderId,
        amount,
        status:"PENDING"
    })

    await payment.save()

    return res
    .status(200)
    .json(new ApiResponse(200,payment,"Payment initiated successfully"))

})
const getPaymentDetailsOfAnOrder=asyncHandler(async(req,res)=>{
    const orderId=req.params.orderId

  const payment=await Payment.findOne({order:orderId}).populate("user order")
  return res
  .status(200)
  .json(new ApiResponse(200,payment,"Here is payment detail of an order"))
})
export {initiatePaymentForAnOrder,getPaymentDetailsOfAnOrder}