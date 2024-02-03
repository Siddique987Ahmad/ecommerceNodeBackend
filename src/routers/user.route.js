import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllors/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router();
//router.use(verifyJWT);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)

export default router;