import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path:"./env"
})

connectDB()

.then(()=>{
app.listen(process.env.PORT||3000,()=>{
    console.log(`SERVER IS RUNNING ON ${process.env.PORT}`)
})
})
.catch((error)=>{
console.log("Connection failed",error)
})