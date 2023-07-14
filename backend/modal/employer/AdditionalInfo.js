import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";

const AdditionalInfoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
  },
  aboutCompany: {
    type: String,
  },
  recommendedMentor: [
    {
      type: String,
    },
  ],
});

export const AdditionalInfoModel = mongoose.model(
  "EmployerAdditionalInfo",
  AdditionalInfoSchema
);

//  we can get additional information here as well [ ref for jobs and all]
