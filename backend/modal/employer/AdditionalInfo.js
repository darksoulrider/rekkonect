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
  companyWebiste: {
    type: String,
  },
  recommendMentor: [
    {
      type: String,
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
