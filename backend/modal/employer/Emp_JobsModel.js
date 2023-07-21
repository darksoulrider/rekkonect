import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import { industryType } from "./industryType";
const Emp_JobsModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      unique: true,
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
    },
    reportingTo: {
      type: String,
      required: [true, "reporting is required"],
    },
    companyName: {
      type: String,
      required: [true, "company name is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    jobType: {
      type: String,
      enum: ["fulltime", "internship", "Gig", "part time", "project based"],
    },
    location: {
      type: String,
      enum: ["remote", "hybrid", "on-site"],
    },
    workDays: {
      firstDay: {
        type: String,
        required: [true, "startDay required"],
      },
      lastDay: {
        type: String,
        required: [true, "startDay required"],
      },
    },
    compensation: {
      salary: {
        type: Number,
        required: [true, "salary required"],
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
    industryType: {
      type: String,
      enum: industryType,
    },
    qualification: {
      type: String,
      required: [true, "Qualification"],
    },
    skillsRequired: {},
    deadline: {
      /* */
    },
    isStatus: {
      /* active or not*/
    },
    responsibility: {},
    assignTask: {
      // not sure
    },
    applicants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "User reference is required"],
        unique: true,
      },
    ],
  },
  { timestamps: true }
);
export const Emp_JobModel = mongoose.model("EmployerJob", Emp_JobsModel);
//  we can get additional information here as well [ ref for jobs and all]
