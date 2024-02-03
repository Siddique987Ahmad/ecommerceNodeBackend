import mongoose,{Schema} from "mongoose";

const orderItemsSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        min:1,
        required:true
    }
})


const orderSchema=new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    totalAmount:{
        type:Number,
        default:0,
        required:true
    },
    status:{
type:String,
enum:['PENDING','CANCELED','SHIPPED','COMPLETED'],
default:'PENDING'
    },
    shippingAddress:{
        type:String,
        required:true
    },
    products:{
        type:[orderItemsSchema]
    }



},{timestamps:true})

export const Order=mongoose.model("Order",orderSchema)