import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";

//  **** week days ***

const MeetModel = new mongoose.Schema({
  //  if user  alredy booked multiple session as weekly
  //    check if uniqe parameter is required or not
  mentoruser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
    unique: true,
  },
  menteeuser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
    unique: true,
  },
  mdate: {
    type: Date,
  },
});
