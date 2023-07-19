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

// ! *********** Additional info routes *********
router
  .route("/employer/profile/additionalinfo")
  .get(isAuthenticated, employerProfileController.getAdditionalInfo);

// think how can we shorten this below url
router
  .route("/employer/profile/why")
  .post(isAuthenticated, employerProfileController.whyinfo);

router
  .route("/employer/profile/recommend")
  .post(isAuthenticated, employerProfileController.recommendMentor);

router
  .route("/employer/profile/headquarter")
  .post(isAuthenticated, employerProfileController.sendHeadquerter);

router
  .route("/employer/profile/website")
  .post(isAuthenticated, employerProfileController.sendWebsite);

// *********** upload files routes ***********
// --- FIle upload ---- [ fixed - dont change]
router
  .route("/employer/profile/fileupload")
  .post(isAuthenticated, profileFiles, employerProfileController.fileUpload);

router
  .route("/employer/profile/FileDelete/:fileId")
  .delete(isAuthenticated, employerProfileController.deleteFile);

router
  .route("/employer/profile/addsocial")
  .post(isAuthenticated, employerProfileController.addSocialAccount);

router
  .route("/employer/profile/editsocial/:id")
  .put(isAuthenticated, employerProfileController.editsociallinks);

router
  .route("/employer/profile/deletesocial/:id")
  .delete(isAuthenticated, employerProfileController.deleteSocialAccount);

// ! *********** End Additional info routes *********

export default router;
