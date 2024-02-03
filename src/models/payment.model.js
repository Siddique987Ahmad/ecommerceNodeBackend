import mongoose,{Schema} from "mongoose";

const paymentSchema=new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        order:{
            type:Schema.Types.ObjectId,
            ref:"Order"
        },
        amount:{
            type:Number,
            min:400,
            required:true
        },
        status:{
            type:String,
            enum:['PENDING','SUCCESSFUL','FAILED']
        }
    }
)

export const Payment=mongoose.model("Payment",paymentSchema)