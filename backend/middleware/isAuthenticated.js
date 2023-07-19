import catchAsyncError from "./catchAsynchError.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { userModal } from "../modal/userModal.js";
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGI1NzI4MWQ0MzBkMDY5MDY5MDAzMzciLCJ1c2VyVHlwZSI6ImVtcGxveWVyIiwiZW1haWwiOiJtYWNrQG1hY2suY29tIiwiaWF0IjoxNjg5NjgxNDY4LCJleHAiOjE2OTAxMTM0Njh9.Q0jVvxrs_7jalg3-0aXw1ciIlnVoOmiJ6kc507P7rtM";

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
