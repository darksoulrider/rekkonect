import express from "express";
const router = express.Router();

// ********** Imports controllers and many *********
import * as MentorSession from "../controller/meetbook/sessionbookController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

// this route takes id of mentor
router
  .route("/booksession/:id")
  .post(isAuthenticated, MentorSession.BookSession);

// this route takes id of the object i.e _id
router
  .route("/reschedulesession/:id")
  .put(isAuthenticated, MentorSession.rescheduleSession);

export default router;
