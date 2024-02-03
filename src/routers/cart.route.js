import { Router } from "express";
import { addProductToUserCart, getUserCart,updateQuantityOfProductByUserCart,removeProductInUserCart } from "../controllors/cart.controller.js";

const router=Router();
//add product to user cart
router.route('/addProductToUserCart/:userId/add').post(addProductToUserCart)
//get user cart
router.route('/getUserCart/:userId').get(getUserCart)
//update the quantity of a product by user cart
router.route('/updateQuantityOfProductByUserCart/:userId/update/:productId').patch(updateQuantityOfProductByUserCart)
//remove product from user cart
router.route('/removeProductInUserCart/:userId/remove/:productId').delete(removeProductInUserCart)
export default router;