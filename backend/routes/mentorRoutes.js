import express from "express";
const router = express.Router();

// ********** Imports the routes ******************
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import * as mentorcontroller from "../controller/mentor/mentor_profile_controller.js";

// ******* update address *********
router
  .route("/mentor/address")
  .put(isAuthenticated, mentorcontroller.updateAddress);

// ******** mentor Education ********
router
  .route("/mentor/education")
  .post(isAuthenticated, mentorcontroller.AddEducation);

router
  .route("/mentor/education/:id")
  .put(isAuthenticated, mentorcontroller.updateEducation)
  .delete(isAuthenticated, mentorcontroller.deleteEducation);

// ******** mentor Experince ***************

router
  .route("/mentor/experience")
  .post(isAuthenticated, mentorcontroller.AddExperience);

router
  .route("/mentor/experience/:id")
  .put(isAuthenticated, mentorcontroller.UpdateExperience)
  .delete(isAuthenticated, mentorcontroller.deleteExperience);

//  ****************** Mentor Skill | languge ****************

router
  .route("/mentor/skills-languages")
  .post(isAuthenticated, mentorcontroller.add_Skills_Language);

// **************** Mentor your 11 ********************
router
  .route("/mentor/your11")
  .post(isAuthenticated, mentorcontroller.addYour11);
router
  .route("/mentor/your11/:id")
  .put(isAuthenticated, mentorcontroller.updateYour11)
  .delete(isAuthenticated, mentorcontroller.deleteYour11);

// ************* Mentor session charge ****************
router
  .route("/mentor/sessioncharge")
  .post(isAuthenticated, mentorcontroller.setSessionCharge);

// ************* Meet link ****************
router
  .route("/mentor/meetlink")
  .post(isAuthenticated, mentorcontroller.setMeetLink);

router
  .route("/mentor/meetlink/delete")
  .delete(isAuthenticated, mentorcontroller.deleteMeetLink);

// ************* Single slots link ****************

router
  .route("/mentor/singleslot")
  .post(isAuthenticated, mentorcontroller.setSingleSlot);

router
  .route("/mentor/singleslot/:id")
  .put(isAuthenticated, mentorcontroller.updateSingleSlot)
  .delete(isAuthenticated, mentorcontroller.deleteSingleSlot);
// ************* recurringslot slots link ****************

router
  .route("/mentor/recurringslot")
  .post(isAuthenticated, mentorcontroller.addRecurringSlot);
router
  .route("/mentor/recurringslot/:id")
  .put(isAuthenticated, mentorcontroller.updateRecurringSlot)
  .delete(isAuthenticated, mentorcontroller.deleteRecurringSlot);

export default router;
