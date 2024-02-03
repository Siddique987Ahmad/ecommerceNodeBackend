import { Router } from "express";
import { createCategories, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllors/category.controller.js";
const router=Router();


router.route("/createCategories").post(createCategories);
//Get all categories
router.route("/getAllCategories").get(getAllCategories);
//get categories by id
router.route("/getCategoryById/:categoriesId").get(getCategoryById)
//update

router.route("/updateCategory/:categoriesId").patch(updateCategory);
//delete

router.route("/deleteCategory/:categoriesId").delete(deleteCategory)

export default router;