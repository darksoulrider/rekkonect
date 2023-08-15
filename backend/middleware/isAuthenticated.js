import catchAsyncError from "./catchAsynchError.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { userModal } from "../modal/userModal.js";
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  // token is for mentor session
  // for mentor mentor@mack.com
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM4YjI3YTJmOWM3ZjdjZWQxZmU2NmMiLCJ1c2VyVHlwZSI6Im1lbnRvciIsImVtYWlsIjoibWVudG9yQG1hY2suY29tIiwiaWF0IjoxNjkxNTYyOTMzLCJleHAiOjE2OTE5OTQ5MzN9.XahVJmJezIMXql3RlNu5ZI5qlHMHVzOFbHFdR0Y3OFU";

  // for meenakshin inventiway
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNhOGQ1NDk0YWMwNDU4ZjYwZWU3Y2YiLCJ1c2VyVHlwZSI6Im1lbnRvciIsImVtYWlsIjoibWVuYWtzaGlAaW52ZW50aXdheS5jb20iLCJpYXQiOjE2OTEyMTg0MjgsImV4cCI6MTY5MTY1MDQyOH0.rqE-ei-Ziv9Bt5r4RIQucDnPGRDo26TElN9FM3LAHnU";

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
