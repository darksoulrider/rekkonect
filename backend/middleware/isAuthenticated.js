import catchAsyncError from "./catchAsynchError.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { userModal } from "../modal/userModal.js";
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  console.log(req.cookies);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGMzZTMzZTNiNzU3NDZmNzQ5Mjc4NWYiLCJ1c2VyVHlwZSI6ImVtcGxveWVyIiwiZW1haWwiOiJtYWNrQG1hY2suY29tIiwiaWF0IjoxNjkwNTYyNjMzLCJleHAiOjE2OTA5OTQ2MzN9.krRuaWCBWG11wzRqTbT1flp3FabLrDr8cfP1wqY0gos";

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
