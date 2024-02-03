import mongoose,{Schema} from "mongoose";

const reviewSchema=new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        product:{
            type:Schema.Types.ObjectId,
            ref:"Product"
        },
        comment:{
            type:String,
           
        },
        rating:{
            type:Number,

        }
    },
    {
        timestamps:true
    }
)

export const Review=mongoose.model("Review",reviewSchema)