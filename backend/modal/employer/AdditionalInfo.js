import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";

const AdditionalInfoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
    unique: true,
  },
  aboutCompany: {
    type: String,
  },
  headquarter: {
    type: String,
  },
  website: {
    type: String,
    minLength: [6, "minimum 6 characters required"],
  },
  recommendMentor: [
    {
      type: String,
      required: [true, "recommend email required"],
      validate: [validator.isEmail, "Email address is not valid"],
      //  you can minLength if you want
    },
  ],
  socialMedia: [
    {
      link: {
        type: String,
        required: [true, "Social link required"],
        unique: true,
        minLength: [6, "Minimum 6 characters required"],
      },
    },
  ],
  files: [
    {
      public_id: {
        type: String,
        required: [true, "Public id is required"],
      },
      secure_url: {
        type: String,
        required: [true, "secure url is required"],
      },
    },
  ],
});

export const AdditionalInfoModel = mongoose.model(
  "EmployerAdditionalInfo",
  AdditionalInfoSchema
);

//  we can get additional information here as well [ ref for jobs and all]
