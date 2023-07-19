import express from "express";
const router = express.Router();

// ***  importing the controllers ***

import * as userController from "../controller/userController.js";
import * as employerProfileController from "../controller/employer/employerUserProfile.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

// Authentication  -> controllers
router.route("/login").post(userController.LoginController);
// router.route("/signup").post(userController.RegisterController);
router.route("/employer/signup").post(userController.RegisterEmployer);

// router.route("/signupWithGoogle").post(userController.GoogleLogin);
// router.route("/signupWithFacebook").post(userController.FacebookLogin);

// *** Profile routes ***
// ! shifted to separate files
// router
//   .route("/employer/profile/personalinfo")
//   .post(isAuthenticated, employerProfileController.UpdateEmployerPersonalInfo)
//   .get(isAuthenticated, employerProfileController.GetPersonalInfo);
export default router;
