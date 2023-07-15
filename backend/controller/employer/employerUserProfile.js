import catchAsyncError from "../../middleware/catchAsynchError.js";
import ErrorHandler from "../../utils/errorHandler.js";
import sendToken from "../../utils/sendtoken.js";
import { userModal } from "../../modal/userModal.js";
import { AdditionalInfoModel } from "../../modal/employer/AdditionalInfo.js";
import getDataUri from "../../utils/dataUri.js";
import cloudinary from "cloudinary";

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
export const addAdditionalInfo = catchAsyncError(async (req, res, next) => {
  const { aboutCompany, mentor } = req.body;
  const _id = req.id;
  const email = req.email;
  const userType = req.userType;

  let user = await userModal.findOne({ email: email, userType: userType });

  if (!user) next(new ErrorHandler("UnAuthorized access", 400));

  let info = await AdditionalInfoModel.findOne({ user: _id });
  // console.log(info);
  if (info) {
    info.aboutCompany = aboutCompany || info.aboutCompany;
    if (!info.recommendedMentor.includes(mentor)) {
      info.recommendedMentor.push(mentor);
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

export const updateAdditionalInfo = catchAsyncError(async (req, res, next) => {
  const files = req.files;
  // loop below to upload data,
  res.status(200).json({
    files: files,
  });
});

export const fileUpload = catchAsyncError(async (req, res, next) => {
  const file = req.files[0];
  // i can access file.buffer give me way to send it to cloudinaryy as well
  const seeme = getDataUri(file);
  const sendfile = await cloudinary.v2.uploader.upload(seeme.content, {
    public_id: "mukesh file",
    folder: "assets",
  });
  res.status(200).json({
    success: true,
    message: "you have successfully uploaded..",
    public_id: sendfile.public_id,
    secure_url: sendfile.secure_url,
  });
});
export const deleteFile = catchAsyncError(async (req, res, next) => {});
