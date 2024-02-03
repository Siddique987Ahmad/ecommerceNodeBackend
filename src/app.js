import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"

const app=express();

app.use(cors({

    origin:process.env.CORS_ORIGIN,
    credentials:true

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routers/user.route.js"
import productRouter from "./routers/product.route.js"
import categoryRouter from './routers/category.route.js'
import cartRouter from './routers/cart.route.js'
import orderRouter from './routers/order.route.js'
import reviewRouter from './routers/review.route.js'
import paymentRouter from './routers/payment.route.js'
app.use("/api/v2/users",userRouter)
app.use("/api/v2/products",productRouter)
app.use("/api/v2/categories",categoryRouter)
app.use("/api/v2/cart",cartRouter)
app.use("/api/v2/order",orderRouter)
app.use("/api/v2/reviews",reviewRouter)
app.use("/api/v2/payments",paymentRouter)

export default app;