import catchAsyncError from "../../middleware/catchAsynchError.js";
import ErrorHandler from "../../utils/errorHandler.js";
import sendToken from "../../utils/sendtoken.js";
import { userModal } from "../../modal/userModal.js";
import { AdditionalInfoModel } from "../../modal/employer/AdditionalInfo.js";
import getDataUri from "../../utils/dataUri.js";
import cloudinary from "cloudinary";
import crypto from "crypto";
import { response } from "express";
import { rmSync } from "fs";
import mongoose from "mongoose";
export const UpdateEmployerPersonalInfo = catchAsyncError(
  async (req, res, next) => {
    // ! dont trust user given in body email , take out email from jwt and then do search result
    console.log(req.body);

    let user = await userModal.findOne({
      email: req.email,
      userType: req.userType,
    });
    if (!user) return next(new ErrorHandler("User not found", 404));

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.contact || user.phoneNumber;
    user.companyName = req.body.companyName || user.companyName;
    user.birthdate = req.body.birthDate || user.birthdate;
    user.address.state = req.body.state || user.address.state;
    user.address.city = req.body.city || user.address.city;
    user.address.landMark = req.body.landMark || user.address.landMark;
    user.address.pinCode = req.body.pinCode || user.address.pinCode;

    user = await user.save();

    res.status(200).json({
      success: true,
      data: "Updating employer information",
      user,
    });
  }
);

export const GetPersonalInfo = catchAsyncError(async (req, res, next) => {
  const { email, userType, _id } = req;
  if (userType != "employer")
    return next(new Error("Unauthorized access", 401));
  let user = await userModal
    .findOne({ email: email, userType: userType })
    .select("-password");
  if (!user) return next(new ErrorHandler("No user found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

// ********* Additional INformation Schema ************* [ setting req.id or req.email form isAuth ]
// we can separate this email into isAuthenticated

// ******** get Additional info ************

export const getAdditionalInfo = catchAsyncError(async (req, res, next) => {
  const { id, email, userType, user } = req;
  const addinfo = await AdditionalInfoModel.findOne({ user: id }).populate(
    "user"
  );
  if (!addinfo) return next(new ErrorHandler("UnAuthorized access", 400));

  res.status(200).json({
    success: true,
    addinfo,
  });
});

export const addAdditionalInfo = catchAsyncError(async (req, res, next) => {
  const { aboutCompany, mentor } = req.body;
  const _id = req.id;
  const email = req.email;
  const userType = req.userType;

  let user = await userModal.findOne({ email: email, userType: userType });

  if (!user) return next(new ErrorHandler("UnAuthorized access", 400));

  let info = await AdditionalInfoModel.findOne({ user: _id });

  if (info) {
    info.aboutCompany = aboutCompany || info.aboutCompany;
    if (!info.recommendedMentor.includes(mentor)) {
      info.recommendeMentor.push(mentor);
    }
    await info.save();
  } else {
    info = await AdditionalInfoModel.create({
      aboutCompany: aboutCompany,
      user: req.id,
      recommendedMentor: mentor,
    });
  }

  res.status(201).json({
    success: true,
    info,
  });
});

//  ********** Send why ? [ about company ] ***************

export const whyinfo = catchAsyncError(async (req, res, next) => {
  const { why } = req.body;
  const { id, userType, email } = req; // token
  console.log(`req.body => ${req.body.why}`);

  let info = await AdditionalInfoModel.findOne({ user: id });
  if (info) {
    info.aboutCompany = why || info.aboutCompany;
    await info.save();
  } else {
    info = await AdditionalInfoModel.create({
      aboutCompany: why,
      user: id,
    });
  }

  res.status(201).json({
    success: true,
    info,
  });
});

// ************** Employer files upload ********

// i can access file.buffer give me way to send it to cloudinaryy as well
export const fileUpload = catchAsyncError(async (req, res, next) => {
  const { id, email, userType, user } = req;

  // file upload process
  const file = req.files[0];
  const rend = crypto.randomBytes(12).toString("hex");
  const uri = getDataUri(file);

  const sendfile = await cloudinary.v2.uploader.upload(
    uri.content,
    {
      public_id: `${rend}-${file.originalname}`,
      folder: "assets",
    },
    (error, result) => {
      if (error) {
        return next(new ErrorHandler("File upload failed."), 400);
      }
    }
  );

  // save to database successfully.core-styles-module_arrow__cvMwQ
  let info = await AdditionalInfoModel.findOne({ user: id });

  if (sendfile.public_id) {
    if (info) {
      info.files.push({
        public_id: sendfile.public_id,
        secure_url: sendfile.secure_url,
      });
      await info.save();
    } else {
      info = await AdditionalInfoModel.create({
        user: id,
        files: [
          {
            public_id: sendfile.public_id,
            secure_url: sendfile.secure_url,
          },
        ],
      });
    }
  }

  res.status(200).json({
    success: true,
    message: "File uploaded..",
    public_id: sendfile.public_id,
    secure_url: sendfile.secure_url,
  });
});

// ****** employer file delete ************
export const deleteFile = catchAsyncError(async (req, res, next) => {
  const doc_id = req.params.fileId;

  const { id, email, userType, user } = req; // from token

  /*
    let info = await AdditionalInfoModel.findOne({ _id: add_id ,});
    we cann use this to check if the doc is present,
  */
  const check_file = await AdditionalInfoModel.findOne({ user: id });
  const isExist = check_file.files.some((file) => file._id.equals(doc_id));

  if (!isExist) return next(new ErrorHandler("File does not exist"));

  let info = await AdditionalInfoModel.findOneAndUpdate(
    { user: id },
    { $pull: { files: { _id: doc_id } } },
    { new: true }
  );

  if (!info) return next(new ErrorHandler("not deleted ", 400));

  res.status(200).json({
    success: true,
    message: "deleted successfully",
    info,
  });
});
