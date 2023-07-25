import catchAsyncError from "./catchAsynchError.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { userModal } from "../modal/userModal.js";
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGJkNGRkMDg2N2JhZWE4NzBlZDE3NzkiLCJ1c2VyVHlwZSI6ImVtcGxveWVyIiwiZW1haWwiOiJ0ZXN0aW5nMkBtYWNrLmNvbSIsImlhdCI6MTY5MDEyNzgyNSwiZXhwIjoxNjkwNTU5ODI1fQ.3d1F56uH7jfYaI69J_WgiRC8pah9RrZCcC5tGCfzQEY";

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
