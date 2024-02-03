import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";



const createOrder=asyncHandler(async(req,res)=>{
    const {userId,shippingAddress,items}=req.body
    if (!userId||!shippingAddress||!items) {
        throw new ApiError(400,"Fields are required")
    }

    const totalAmount=calculateTotalAmount(items)

  const newOrder=new Order({
        user:userId,
        totalAmount,
        shippingAddress,
        status:"PENDING",
        products:items.map(item=>({product:item.product,quantity:item.quantity}))
    })
await newOrder.save();
return res
.status(200)
.json(new ApiResponse(200,newOrder,"New order placed successfully"))
})
const calculateTotalAmount=(items)=>{
    return items.reduce((total,item)=>{
        const productPrice=item.product.price
        return total+item.quantity*productPrice
    },0)
}

const getAllOrder=asyncHandler(async(req,res)=>{
    const userId=req.params.userId

   const order=await Order.find({user:userId}).populate("products.product")

   return res
   .status(200)
   .json(new ApiResponse(200,order,"Here is user orders"))

})
const getdetailsOfOrder=asyncHandler(async(req,res)=>{
    const orderId=req.params.orderId
   const order=await Order.findById(orderId)
   return res
   .status(200)
   .json(new ApiResponse(200,order,"Here is detail of an Order"))
})
export {createOrder,getAllOrder,getdetailsOfOrder}