import catchAsyncError from "./catchAsynchError.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { userModal } from "../modal/userModal.js";
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmOTZhOTA2Mzc3ZTIzNmRkNWYxNjgiLCJ1c2VyVHlwZSI6ImVtcGxveWVyIiwiZW1haWwiOiJyaW1hLmludmVudGl3YXlAZ21haWwuY29tIiwiaWF0IjoxNjg5MjI4OTcwLCJleHAiOjE2ODk2NjA5NzB9.rDQ_-qunsTQyNtu1C5SBHpg3tguhgIsw5rjH6y-eTu8";

  console.log("hit this isAuthentticated");
  if (!token) {
    return next(new ErrorHandler("Not Logged In", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

  const user = await userModal.findOne({
    email: decoded.email,
    userType: decoded.userType,
  });
  if (!user) {
    return next(new ErrorHandler("Un authorised access", 400));
  }
  req.user = user;
  req.userType = decoded.userType;
  req.email = decoded.email;
  req.id = decoded._id;
  next();
});
