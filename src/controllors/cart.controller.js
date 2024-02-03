import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";

const addProductToUserCart=asyncHandler(async(req,res)=>{
    const {userId}=req.params
    const {productId,quantity}=req.body
    if (!userId || !productId || !quantity) {
        throw new ApiError(400,"Fields are required")
    }
   const product=await Product.findById(productId)
   if (!product) {
    throw new ApiError(400,"product not here")
   }
   //check if user has cart if not then create it
   let userCart=await Cart.findOne({user:userId})
   if (!userCart) {
    userCart=await Cart.create({user:userId})
   }

   //check if product already in user cart

   const existingCart=userCart.items.find(item=>item.product.equals(productId))
   if (existingCart) {
    //if product is already on cart then update it
    existingCart.quantity+=parseInt(quantity,10)
   }
   else{
    //if product is not on cart then create new one
    userCart.items.push({
        product:productId,
        quantity:parseInt(quantity,10),
        
    })
   }
//calculate total amount based on items on cart

userCart.totalAmount=userCart.items.reduce((total,item)=>{
    const productPrice=product.price
    return total+item.quantity*productPrice
},0)
const cart= await userCart.save()
return res
.status(200)
.json(new ApiResponse(200,cart,"Product added to cart successfully"))
})
const getUserCart=asyncHandler(async(req,res)=>{
    const userId=req.params.userId
    if (!userId) {
        throw new ApiError(400,"User not here")
    }
   const cart=await Cart.findOne({user:userId})
   return res
   .status(200)
   .json(new ApiResponse(200,cart,"User cart is here successfully"))
})

const updateQuantityOfProductByUserCart=asyncHandler(async(req,res)=>{

    const {userId,productId}=req.params
    const {quantity}=req.body

    if (!userId || !productId || !quantity) {
        throw new ApiError(400,"Fields required")
    }

    const userCart=await Cart.findOne({user:userId}).populate('items.product')
    if (!userCart) {
        throw new ApiError(400,"user not here")
    }

    const cartItem=userCart.items.find(item=>item.product.equals(productId))

    if (!cartItem) {
        throw new ApiError(400,"product not here")
    }

    cartItem.quantity=parseInt(quantity,10)

    userCart.totalAmount=userCart.items.reduce((total,item)=>{
        const product = item.product;
        // console.log(`Item: ${item.product} - Quantity: ${item.quantity} - Price: ${product ? product.price : 'N/A'}`);

        // Check if the product is valid and has a price
        if (product && typeof product.price === 'number') {
          const productPrice = product.price;
          return total + item.quantity * productPrice;
        } else {
          return total; // Skip invalid or missing products
        }
    },0)
    const cart=await userCart.save()
    return res
    .status(200)
    .json(new ApiResponse(200,cart,"cart updated successfully"))

})
const removeProductInUserCart=asyncHandler(async(req,res)=>{
    const {userId,productId}=req.params

    if (!userId||!productId) {
        throw new ApiError(400,"UserId and productId required")
    }

    const userCart=await Cart.findOne({user:userId})
if (!userCart) {
    throw new ApiError(400,"User id not here")
}

const updatedItems=userCart.items.filter(item=>!item.product.equals(productId))
userCart.items=updatedItems
userCart.totalAmount=updatedItems.reduce((total,item)=>{
    const productPrice=item.product.price
    return total+item.quantity*productPrice
},0)

const cart= await userCart.save()

return res
.status(200)
.json(new ApiResponse(200,cart,"Product removed on cart successfully"))

})
export {addProductToUserCart,getUserCart,updateQuantityOfProductByUserCart,removeProductInUserCart}