// we can think again do we need separate folder or onlyy separate files

import catchAsyncError from "../middleware/catchAsynchError.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendtoken.js";
import { userModal } from "../modal/userModal.js";
import isGmail from "../utils/isGmail.js";
import crypto from "crypto";

// ! handle login for email case sensitiveness
export const RegisterEmployer = catchAsyncError(async (req, res, next) => {
  // ! write logic for terms acceptance - [required]
  const {
    firstName,
    lastName,
    email,
    password,
    companyName,
    address,
    phoneNumber,
    DOB,
    userType,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !companyName ||
    !address ||
    !phoneNumber ||
    !DOB ||
    !userType
  ) {
    return next(new ErrorHandler("Please Enter all the field..", 400));
  }
  if (isGmail(email))
    return next(
      new ErrorHandler("No Gmail address is allowed to be registered", 400)
    );

  if (userType != "employer")
    return next(new ErrorHandler("User must be employer", 400));

  let user = await userModal.findOne({ email: email });
  if (user) return next(new ErrorHandler("User already Exists..", 401));
  //  we can generate token here and then verify the email with token
  user = await userModal.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    companyName: companyName,
    address: address,
    phoneNumber: phoneNumber,
    birthdate: DOB,
    userType: userType,
  });
  console.log(`comming from Emplyer regiseter -> ${user}`);
  sendToken(res, user, "User Successfully registered..", 200);
});

// *************** Register Mentor ***************

export const RegisterMentor = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    companyName,
    address,
    phoneNumber,
    DOB,
    userType,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !companyName ||
    !address ||
    !phoneNumber ||
    !DOB ||
    !userType
  ) {
    return next(new ErrorHandler("Please Enter all the field..", 400));
  }

  if (userType !== "mentor")
    return next(new ErrorHandler("User must be mentor", 400));

  let user = await userModal.findOne({ email: email });
  console.log(user);
  if (user) return next(new ErrorHandler("User already Exists..", 401));
  //  we can generate token here and then verify the email with token
  const generateToken = () => {
    return crypto.randomBytes(12).toString("hex");
  };
  const token = generateToken();
  // send varify email with token
  user = await userModal.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    companyName: companyName,
    address: address,
    phoneNumber: phoneNumber,
    birthdate: DOB,
    userType: userType,
    verifyToken: token,
  });
  console.log(`comming from Mentor regiseter -> ${user}`);
  sendToken(res, user, "User Successfully registered..", 200);
});

// ************** loign controllers **************

export const LoginController = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter all field..", 400));
  }

  const user = await userModal.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("email or password is incorrect", 404));
  }

  const isMatch = await user.comparePassword(password);
  console.log(isMatch);
  if (!isMatch) {
    return next(new ErrorHandler("email or password is incorrect", 404));
  }

  sendToken(res, user, "Successfully loged in..", 200);
});

export const LogoutController = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: "successfully logged out.",
  });
});

export const ChangePasswordController = catchAsyncError(async () => {
  //  think a change password internally as well as without loged in process
  const { user, id, userType, email } = req;
  const { oldpassword, newpassword } = req.body;

  if (newpassword.length < 8) {
    return next(new ErrorHandler("Password must be at least 8 characters"));
  }
  const userData = await userModal
    .findOne({ email: email, _id: id })
    .select("+password");

  if (!userData) {
    return next(new ErrorHandler("Something went wrong", 404));
  }

  const isMatch = await userData.comparePassword(oldpassword);
  console.log(isMatch);
  if (!isMatch) {
    return next(new ErrorHandler("old password is incorrect", 404));
  }
  userData.password = newpassword;
  userData.validate();
  userData.save();
  res.status(200).json({
    success: true,
    message: "Password successfully updated",
  });
});

// export const Logout = catchAsyncError(async (req, res, next) => {
// if needed this way.
//   res
//     .status(200)
//     .cookie("token", null, {
//       expires: new Date(Date.now()),
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     })
//     .json({
//       success: true,
//       message: "Logged Out Successfully",
//     });
// });

export const GoogleLogin = catchAsyncError(async (req, res, next) => {});
export const FacebookLogin = catchAsyncError(async (req, res, next) => {});
