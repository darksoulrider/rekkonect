import express from "express";
const router = express.Router();

// ***  importing the controllers ***

import * as employerProfileController from "../controller/employer/userProfile.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

// *** Profile info routes ****

router
  .route("/employer/profile/personalinfo")
  .post(isAuthenticated, employerProfileController.UpdateEmployerPersonalInfo)
  .get(isAuthenticated, employerProfileController.GetPersonalInfo);

router
  .route("/employer/profile/additionalinfo")
  .post(isAuthenticated, employerProfileController.addAdditionalInfo);

router
  .route("/employer/profile/additionalinfo/:id")
  .put(isAuthenticated, employerProfileController.addAdditionalInfo);
export default router;
