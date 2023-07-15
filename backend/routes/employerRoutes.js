import express from "express";
const router = express.Router();
import { profileFiles } from "../middleware/multerMiddleware.js";
// ***  importing the controllers ***

import * as employerProfileController from "../controller/employer/employerUserProfile.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

// *** Profile info routes start ****

router
  .route("/employer/profile/personalinfo")
  .post(isAuthenticated, employerProfileController.UpdateEmployerPersonalInfo)
  .get(isAuthenticated, employerProfileController.GetPersonalInfo);

// *********** Additional info routes *********
router
  .route("/employer/profile/additionalinfo")
  .post(isAuthenticated, employerProfileController.addAdditionalInfo);

router
  .route("/employer/profile//:id")
  .put(isAuthenticated, employerProfileController.addAdditionalInfo);

// *********** upload files routes ***********

// think how can we shorten this below url
router.route("/employer/profile/additionalinfo/why");
router.route("/employer/profile/additionalinfo/recommend");
// --- FIle upload ----
router
  .route("/employer/profile/fileupload")
  .post(isAuthenticated, profileFiles, employerProfileController.fileUpload);

router
  .route("/employer/profile/FileDelete/:id")
  .delete(isAuthenticated, employerProfileController.deleteFile);

export default router;
