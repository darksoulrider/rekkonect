import express from "express";
const router = express.Router();

// ***  importing the controllers ***

import * as userController from "../controller/userController.js";

// Authentication  -> controllers
router.route("/login").post(userController.LoginController);
router.route("/signup").post(userController.RegisterController);
router.route("/signupWithGoogle").post(userController.GoogleLogin);
router.route("/signupWithFacebook").post(userController.FacebookLogin);

// *** Profile routes ***

export default router;
