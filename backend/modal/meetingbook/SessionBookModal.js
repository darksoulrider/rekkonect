import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";

//  **** week days ***

const MeetModel = new mongoose.Schema(
  {
    mentoruser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    menteeuser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    topic: {
      type: String,
      //  can make it compoulsory
    },
    sessioncharge: {
      type: String,
      validate: {
        validator: (value) => {
          if (!validator.isNumeric(value)) {
            throw new Error("session charge must be a number");
          }
          const num = parseFloat(value);
          if (num < 0 || num > 1300) {
            throw new Error(
              "session charge must be between 0 to 1300 a number"
            );
          }
        },
      },
    },
    rescheduleMentor: {
      type: String,

      validate: {
        validator: (value) => {
          if (!validator.isNumeric(value)) {
            throw new Error("rescheduleMentor value must be a number");
          }
          if (parseFloat(value) > 2) {
            throw new Error("You can reschedule meeting only 2 times");
          }
        },
      },
    },
    rescheduleMentee: {
      type: String,

      validate: {
        validator: (value) => {
          if (!validator.isNumeric(value)) {
            throw new Error("rescheduleMentor value must be a number");
          }
          if (parseFloat(value) > 1) {
            throw new Error("You can reschedule meeting only 1 times");
          }
        },
      },
    },
    reschedule: {
      type: Boolean,
      default: false,
    },
    couponUsed: {
      type: String,
    },
    mtime: {
      type: String,
      required: [true, "Meet time is required"],
    },
    mdate: {
      type: Date,
      validate: {
        validator: (value) => {
          const d = new Date();
          if (value < d) {
            throw new Error("Date should not represent past");
          }
        },
      },
    },
    payment: {
      generatedNumber: {
        type: String,
      },
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

export const MentorSessionBook = mongoose.model("MentorSession", MeetModel);
