import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import { industryType } from "./industryType.js";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const Emp_JobsModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
      minLength: [8, "minimum 6 characters is required"],
      maxLength: [300, "maximum 300 characters is required"],
    },
    designation: {
      type: String,
      required: [true, "designation is required"],
      minLength: [4, "minimum 4 characters is required"],
    },
    reportingto: {
      type: String,
      required: [true, "reporting is required"],
      minLength: [2, "minimum 2 characters is required"],
    },
    companyname: {
      type: String,
      required: [true, "company name is required"],
      minLength: [4, "minimum 4 characters is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minLength: [15, "minimum 15 characters is required"],
    },
    jobtype: {
      type: String,
      enum: {
        values: [
          "full time",
          "internship",
          "gig",
          "part time",
          "project based",
        ],
        message: "jobtype is not valid",
      },
      required: [true, "jobtype is required"],
    },
    location: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      required: [true, "location is required"],
    },
    workdays: {
      firstday: {
        type: String,
        enum: {
          values: days,
          message: "No days matched.",
        },
        required: [true, "startDay required"],
      },
      lastday: {
        type: String,
        enum: {
          values: days,
          message: "No days matched.",
        },
        required: [true, "startDay required"],
      },
    },
    compensation: {
      salary: {
        type: String,
        required: [true, "salary required"],
        min: [0, "min required 0 value required"],
        validate: {
          validator: (value) => {
            if (!validator.isNumeric(value)) {
              throw new Error("Only integers required.");
            }
            if (value < 0) {
              throw new Error("No negative integers allowed.");
            }
          },
        },
      },
      benefits: {
        type: String,
        required: [true, "benefits required"],
      },
    },
    contact: {
      type: String,
      required: [true, "contact details is required"],
      validate: {
        validator: (value) =>
          validator.isEmail(value) || validator.isMobilePhone(value), // Validate email or phone
        message: "Contact should be a valid email or phone number",
      },
    },
    industrytype: {
      type: String,
      required: [true, "industry type required"],
      // enum: industryType,
      // see we need  enum or trust frontend or allow other strinng as well
    },
    qualification: {
      type: String,
      required: [true, "Qualification is required "],
    },
    skills: {
      type: String,
      required: [true, "Skils is required"],
      minLength: [2, "minimum 2 characters required"],
    },
    experience: {
      type: String,
      required: [true, "Skills are required"],
      // validate: {
      //   validator: (value) => {
      //     if (!validator.isNumeric(value)) {
      //       throw new Error("Only integers required.");
      //     }
      //   },
      // },
    },
    deadline: {
      type: Date,
      required: [true, "Deadline for the job is required "],
      validate: {
        validator: (value) => {
          const d = new Date();
          if (value < d) {
            throw new Error("Date should not represent past");
          }
        },
      },
    },
    isStatus: {
      type: Boolean,
      default: true,
    },
    assigntask: {
      type: String,
      // not sure
    },
    applicants: [
      //  think when job appliying controller is built
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          required: [true, "User reference is required"],
          // check from controller if presnte then do not add again
        },
        applicationDate: {
          type: Date,
          default: Date.now,
        },
        experience: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
export const Emp_JobModel = mongoose.model("EmployerJob", Emp_JobsModel);
//  we can get additional information here as well [ ref for jobs and all]
