// we can think again do we need separate folder or onlyy separate files

import catchAsyncError from "../middleware/catchAsynchError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/sendtoken.js";

// Register controllers
export const RegisterController = catchAsyncError(async (req, res, next) => {
  console.log("Comming in register servicer....");

  const { username, email, password } = req.body;
  if ((!username, !email, !password))
    return next(new ErrorHandler("Please enter all fields", 404));
  let user = await UserModel.findOne({ username: username });
  if (user) return next(new ErrorHandler("User already Exists..", 401));

  user = await UserModel.create({
    username: username,
    email: email,
    password: password,
  });
  console.log(user);
  sendToken(res, user, "User Successfully registered..", 200);
});

// loign controllers
export const LoginController = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorHandler("Please Enter all field..", 400));
  }
  const user = await UserModel.findOne({ username: username }).select(
    "+password"
  );
  if (!user) {
    return next(new ErrorHandler("Username or password is incorrect", 404));
  }

  const isMatch = user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Username or password is incorrect", 404));
  }
  console.log(user);
  sendToken(res, user, "Successfully loged in..", 200);
});

export const GoogleLogin = catchAsyncError(async (req, res, next) => {});
export const FacebookLogin = catchAsyncError(async (req, res, next) => {});
