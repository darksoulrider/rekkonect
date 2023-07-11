// we can think again do we need separate folder or onlyy separate files

import catchAsyncError from "../middleware/catchAsynchError.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendtoken.js";
import { userModal } from "../modal/userModal.js";
// Register controllers
// export const RegisterController = catchAsyncError(async (req, res, next) => {
//   const {
//     firstName,
//     lastName,
//     email,
//     password,
//     companyName,
//     address,
//     phoneNumber,
//   } = req.body;
//   if (email || !password)
//     return next(new ErrorHandler("Please enter all fields", 404));
//   let user = await userModal.findOne({ username: username });
//   if (user) return next(new ErrorHandler("User already Exists..", 401));

//   user = await userModal.create({
//     email: email,
//     password: password,
//   });
//   console.log(user);
//   sendToken(res, user, "User Successfully registered..", 200);
// });

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

  if (userType != "employer")
    return next(new ErrorHandler("User must be employer", 400));

  let user = await userModal.findOne({ email: email });
  if (user) return next(new ErrorHandler("User already Exists..", 401));

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

//
//
//
//
//
//
//
//
//
//
//
//
// loign controllers
// export const LoginController = catchAsyncError(async (req, res, next) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return next(new ErrorHandler("Please Enter all field..", 400));
//   }
//   const user = await UserModel.findOne({ username: username }).select(
//     "+password"
//   );
//   if (!user) {
//     return next(new ErrorHandler("Username or password is incorrect", 404));
//   }

//   const isMatch = user.comparePassword(password);
//   if (!isMatch) {
//     return next(new ErrorHandler("Username or password is incorrect", 404));
//   }
//   console.log(user);
//   sendToken(res, user, "Successfully loged in..", 200);
// });

export const GoogleLogin = catchAsyncError(async (req, res, next) => {});
export const FacebookLogin = catchAsyncError(async (req, res, next) => {});
