import mongoose,{Schema} from "mongoose";

const cartItemsSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        min:1,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0
    }
})


const cartSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    totalAmount:{
        type:Number,
        default:0
    },
    items:{
        type:[cartItemsSchema]
    }

},{timestamps:true})

export const Cart=mongoose.model("Cart",cartSchema)