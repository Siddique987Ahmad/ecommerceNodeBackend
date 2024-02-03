import { Router } from "express";
import { getPaymentDetailsOfAnOrder, initiatePaymentForAnOrder } from "../controllors/payment.controller.js";

const router=Router();
//initiate payments for an order
router.route('/initiatePaymentForAnOrder').post(initiatePaymentForAnOrder)
//get payment details for an order
router.route('/getPaymentDetailsOfAnOrder/:orderId').get(getPaymentDetailsOfAnOrder)

export default router