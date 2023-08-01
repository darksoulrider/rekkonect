import { MentorProfiles } from "../../modal/mentor/mentor_profile_model.js";
import { userModal } from "../../modal/userModal.js";
import Jwt from "jsonwebtoken";

import catchAsyncError from "../../middleware/catchAsynchError.js";
import ErrorHandler from "../../utils/errorHandler.js";

// ********* update address ****************
export const updateAddress = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const data = req.body;

  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.address.state = data.address.state;
  user.address.pinCode = data.address.pinCode;
  user.bio = data.bio;
  await user.validate();
  user = await user.save();

  res.status(200).json({
    success: true,
    message: "address updated successfully",
    userdata: user,
  });
});

//  ********** Add Education controllers  *************
export const AddEducation = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const { education } = req.body;

  let info = await MentorProfiles.findOne({ user: id });
  if (info) {
    info.education.push(education);
    await info.validate();
    await info.save();
    console.log("called push info");
  } else {
    //  or make data in required format and pass
    info = await MentorProfiles.create({ education: education, user: id });
  }

  res.status(200).json({
    success: true,
    user: info,
  });
});

//  ********** update Education controllers  *************
export const updateEducation = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const { education } = req.body;
  delete education._id; // security
  const edu_id = req.params.id;

  let info = await MentorProfiles.findOne({ user: id });
  if (!info) {
    return next(new ErrorHandler("user not found", 400));
  }

  const indexToUpdate = info.education.findIndex(
    (edu) => edu._id.toString() === edu_id
  );
  if (indexToUpdate == -1) {
    return next(new ErrorHandler("Object not found", 400));
  }
  info.education[indexToUpdate].set(education);
  await info.save();
  res.status(200).json({
    success: true,
    user: info,
  });
});
//  ********** delete Education controllers  *************
export const deleteEducation = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const edu_id = req.params.id;

  let info = await MentorProfiles.findOneAndUpdate(
    { user: id },
    { $pull: { education: { _id: edu_id } } },
    { new: true }
  );
  if (!info) {
    return next(new ErrorHandler("User or object not found"), 400);
  }

  await info.save();
  res.status(200).json({
    success: true,
    message: "delete successfully",
    user: info,
  });
});

// ******** Add Experience *********

export const AddExperience = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const { experience } = req.body;

  let info = await MentorProfiles.findOne({ user: id });
  if (info) {
    info.education.push(education);
    await info.validate();
    await info.save();
    console.log("called push info");
  } else {
    //  or make data in required format and pass
    info = await MentorProfiles.create({ education: education, user: id });
  }

  res.status(200).json({
    success: true,
    user: info,
  });
});
