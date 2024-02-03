import mongoose,{Schema} from "mongoose";

const productSchema=new Schema(
    {
        name:{
            
                type:String,
                required:true,
                unique:true,
                //lowecase:true,
                trim:true,
                index:true
            
        },
        description:{
            type:String,
            required:true,
            //lowecase:true,
            trim:true,
            index:true
        },
        price:{
            type:Number,
            required:true,
            //lowecase:true,
           default:0
        },
        quantity:{
            type:Number,
            required:true,
            
            default:0
          
        },
        brand:{
            type:String,
            required:true,
            unique:true,
            //lowecase:true,
            trim:true,
            index:true
        },
        color:{
            type:String,
            enum:["White","Black","Red","Yellow","Blue"]
           
        },
        size:{
            type:String,
            required:true,
            //lowecase:true,
          
        },
category:{
    type:Schema.Types.ObjectId,
    ref:"Category"
}



    },{timestamps:true})

    export const Product=mongoose.model("Product",productSchema)