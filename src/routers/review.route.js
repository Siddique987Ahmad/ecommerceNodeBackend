import { Router } from "express";
import { addReviewForProduct, getAllReviews } from "../controllors/review.controller.js";

const router=Router();

//get all review for a product
router.route('/getAllReviews/:productId').get(getAllReviews)
// add a review for a product

router.route('/addReviewForProduct').post(addReviewForProduct);

export default router