import { Router } from "express";
import { createOrder, getAllOrder,getdetailsOfOrder } from "../controllors/order.controller.js";
const router=Router();
//create new order
router.route('/createOrder').post(createOrder)
//get all orders from user
router.route('/getAllOrder/:userId').get(getAllOrder)
//get details of specific order

router.route('/getdetailsOfOrder/:orderId').get(getdetailsOfOrder)

export default router