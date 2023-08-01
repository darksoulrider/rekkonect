import express from "express";
const router = express.Router();

// ********** Imports the routes ******************
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import * as mentorcontroller from "../controller/mentor/mentor_profile_controller.js";

// ******* update address *********
router
  .route("/mentor/address")
  .put(isAuthenticated, mentorcontroller.updateAddress);

router
  .route("/mentor/education")
  .post(isAuthenticated, mentorcontroller.AddEducation);

router
  .route("/mentor/education/:id")
  .put(isAuthenticated, mentorcontroller.updateEducation)
  .delete(isAuthenticated, mentorcontroller.deleteEducation);

export default router;
