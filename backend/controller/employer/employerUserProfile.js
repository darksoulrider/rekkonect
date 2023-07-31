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
    let { user, email, userType, id } = req;
    let da = req.body;

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.phoneNumber = req.body.contact;
    user.companyName = req.body.companyName;
    user.birthdate = req.body.birthDate;
    user.address.state = req.body.state;
    user.address.city = req.body.city;
    user.address.landMark = req.body.landmark;
    user.address.pinCode = req.body.pinCode;
    await user.validate();
    user = await user.save();

    res.status(200).json({
      success: true,
      data: "updated employer information",
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

export const uploadProfileImageController = catchAsyncError(
  async (res, req, next) => {
    
  }
);

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

//  ********** Send why ? [ about company ] ***************

export const whyinfo = catchAsyncError(async (req, res, next) => {
  const { why } = req.body;
  const { id, userType, email } = req; // token

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

//  ************** employer Send Recommend Mentor ****************************

export const recommendMentor = catchAsyncError(async (req, res, next) => {
  const { id, userType, email, user } = req;
  const { recommend } = req.body;

  let info = await AdditionalInfoModel.findOne({ user: id });
  if (info) {
    if (!info.recommendMentor.includes(recommend)) {
      info.recommendMentor.push(recommend);
      await info.save();
    } else {
      return next(new ErrorHandler("Mentor already recommended", 400));
    }
  } else {
    info = await AdditionalInfoModel.create({
      recommendMentor: recommend,
      user: id,
    });
  }

  res.status(200).json({
    status: true,
    info,
  });
});

//  *********** Employer headquerter send ***********
export const sendHeadquerter = catchAsyncError(async (req, res, next) => {
  const { id, userType, email, user } = req;
  const { headquarter } = req.body;

  let info = await AdditionalInfoModel.findOne({ user: id });
  if (info) {
    info.headquarter = headquarter || info.headquarter;
    await info.save();
  } else {
    info = await AdditionalInfoModel.create({
      headquarter: headquarter,
      user: id,
    });
  }

  res.status(200).json({
    status: true,
    info,
  });
});

//  *********** Employer website send ***********
export const sendWebsite = catchAsyncError(async (req, res, next) => {
  const { id, email, userType, user } = req;
  const { website } = req.body;
  if (website.includes(" ")) {
    return next(new ErrorHandler("Invalid website.", 400));
  }
  let info = await AdditionalInfoModel.findOne({ user: id });
  if (info) {
    info.website = website || info.website;
    await info.save();
  } else {
    info = await AdditionalInfoModel.create({
      website: website,
      user: id,
    });
  }

  res.status(200).json({
    status: true,
    info,
  });
});

// ******** Employer Social Account [ add ] **********
export const addSocialAccount = catchAsyncError(async (req, res, next) => {
  const { id, user, email, userType } = req;
  const { socialAccount } = req.body;
  if (socialAccount.includes(" ")) {
    return next(new ErrorHandler("Invalid link...", 400));
  }

  let info = await AdditionalInfoModel.findOne({ user: id });

  if (info) {
    const isLinkExist = info.socialMedia.some((link) => {
      return link.link === socialAccount;
    });
    if (isLinkExist) {
      return next(new ErrorHandler("Social Account already exist", 400));
    }
    info.socialMedia.push({ link: socialAccount });
    await info.save();
  } else {
    info = await AdditionalInfoModel.create({
      socialMedia: [{ link: socialAccount }],
      user: id,
    });
  }

  res.status(200).json({
    status: true,
    info,
  });
});

//  ******** edit links **********

export const editsociallinks = catchAsyncError(async (req, res, next) => {
  const { id, user, userType, email } = req;
  const link_id = req.params.id;
  const { Changedlink } = req.body;
  console.log(`Link ${link_id} || changedlink ${Changedlink}`);
  if (Changedlink.includes(" ")) {
    return next(new ErrorHandler("Invalid link...", 400));
  }

  const check_link = await AdditionalInfoModel.findOne({ user: id });
  const isExist = check_link.socialMedia.some((link) =>
    link._id.equals(link_id)
  );

  if (!isExist) return next(new ErrorHandler("link does not exist"));

  let info = await AdditionalInfoModel.findOneAndUpdate(
    { user: id, "socialMedia._id": link_id },
    { $set: { "socialMedia.$.link": Changedlink } },
    { new: true }
  );

  if (!info) return next(new ErrorHandler("not changed.. ", 400));

  res.status(200).json({
    success: true,
    message: "changed successfully",
    info,
  });
});

//   ******* Delete links ********

export const deleteSocialAccount = catchAsyncError(async (req, res, next) => {
  const { id, user, userType, email } = req;
  const link_id = req.params.id;

  const check_link = await AdditionalInfoModel.findOne({ user: id });
  const isExist = check_link.socialMedia.some((link) =>
    link._id.equals(link_id)
  );

  if (!isExist) return next(new ErrorHandler("link does not exist"));

  let info = await AdditionalInfoModel.findOneAndUpdate(
    { user: id },
    { $pull: { socialMedia: { _id: link_id } } },
    { new: true }
  );

  if (!info) return next(new ErrorHandler("not deleted ", 400));

  res.status(200).json({
    success: true,
    message: "deleted successfully",
    info,
  });

  // ! -- Complete this --
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
