import { Router } from "express";
import { createProducts,deleteProduct,getAllProducts, getProductById, updateProduct } from "../controllors/product.controller.js";
const router=Router();


router.route("/createProduct").post(createProducts);
//Get all products
 router.route("/getAllProducts").get(getAllProducts);
// //get product by id
 router.route("/getProductById/:productId").get(getProductById)
// //update

router.route("/updateProduct/:productId").patch(updateProduct);
// //delete

router.route("/deleteProduct/:productId").delete(deleteProduct)

export default router;