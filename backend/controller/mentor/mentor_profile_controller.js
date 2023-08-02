import { MentorProfiles } from "../../modal/mentor/mentor_profile_model.js";
import { userModal } from "../../modal/userModal.js";
import Jwt from "jsonwebtoken";
import validator from "validator";
import catchAsyncError from "../../middleware/catchAsynchError.js";
import ErrorHandler from "../../utils/errorHandler.js";
import { isValidTime, isValidDate } from "../../utils/helper/helper.js";

// ! check all the validation for isValidDate applied or not in this controller
// ! [ Tomorrow moringing do it all the dates ]
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
  let { education } = req.body;

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
  delete education.user; // security
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
    { user: id, "education._id": edu_id },
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
    info.experience.push(experience);
    await info.validate();
    await info.save();
  } else {
    //  or make data in required format and pass
    info = await MentorProfiles.create({ experience: experience, user: id });
  }

  res.status(200).json({
    success: true,
    user: info,
  });
});

//  **************** Update Experience ****************

export const UpdateExperience = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const { experience } = req.body;
  delete experience._id; // security
  delete experience.user; // security

  const exp_id = req.params.id;

  let info = await MentorProfiles.findOne({ user: id });
  if (!info) {
    return next(new ErrorHandler("user not found", 400));
  }

  const indexToUpdate = info.experience.findIndex(
    (exp) => exp._id.toString() === exp_id
  );

  if (indexToUpdate == -1) {
    return next(new ErrorHandler("Object not found", 400));
  }

  info.experience[indexToUpdate].set(experience);
  await info.validate();
  await info.save();
  res.status(200).json({
    success: true,
    user: info,
  });
});

// ************** Delete experience ****************

export const deleteExperience = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const exp_id = req.params.id;

  let info = await MentorProfiles.findOneAndUpdate(
    { user: id, "experience._id": exp_id },
    { $pull: { experience: { _id: exp_id } } },
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

//  ******************* Add Skills | languages ************************
//  think again on model [ for delete single or delete multiple ]
// ! no delete or put routes for this
export const add_Skills_Language = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const { skills, languages } = req.body;

  let info = await MentorProfiles.findOne({ user: id });
  if (info) {
    // working this
    info.skills = skills;
    info.languages = languages;
    // below alterway to do it but pushing only
    // info.languages.push(...languages);
    // alternate
    // info.skills.push(...skills);
    await info.validate();
    await info.save();
  } else {
    info = await MentorProfiles.create({
      skills: skills,
      languages: languages,
      user: id,
    });
  }

  res.status(200).json({
    success: true,
    user: info,
  });
});

// ************** Your 11 add ***********
export const addYour11 = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const { name, linkdin, contact, why } = req.body;
  let info = await MentorProfiles.findOne({ user: id });

  if (info) {
    info.your11.push({ name, linkdin, contact, why });

    await info.validate();
    await info.save();
  } else {
    info = await MentorProfiles.create({
      your11: { name, linkdin, contact, why },
      user: id,
    });
  }

  res.status(200).json({
    success: true,
    user: info,
  });
});
// ************** Your 11 delete ***********
export const deleteYour11 = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const your11_id = req.params.id;

  let info = await MentorProfiles.findOneAndUpdate(
    { user: id, "your11._id": your11_id },
    { $pull: { your11: { _id: your11_id } } },
    { new: true }
  );

  if (!info) {
    return next(new ErrorHandler("user or object not found"));
  }
  await info.save();

  res.status(200).json({
    success: true,
    user: info,
  });
});

// ********** your 11 update ****************
export const updateYour11 = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const your11 = req.body;
  delete your11._id; // security
  delete your11.user; // security

  const your11_id = req.params.id;

  let info = await MentorProfiles.findOne({ user: id });
  if (!info) {
    return next(new ErrorHandler("user not found", 400));
  }

  const indexToUpdate = info.your11.findIndex(
    (obj) => obj._id.toString() === your11_id
  );

  if (indexToUpdate == -1) {
    return next(new ErrorHandler("Object not found", 400));
  }
  info.your11[indexToUpdate].set(your11);
  await info.validate();
  await info.save();

  res.status(200).json({
    success: true,
    user: info,
  });
});

// ************* Session charge ****************
export const setSessionCharge = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const { sessionCharge } = req.body;
  // const updated_charge = sessioncharge + 199; // default pay [ add if gst]

  let info = await MentorProfiles.findOne({ user: id });

  if (info) {
    info.sessioncharge = sessionCharge;
    await info.validate();
    await info.save();
  } else {
    info = await MentorProfiles.create({
      sessioncharge: sessionCharge,
      user: id,
    });
  }

  res.status(200).json({
    success: true,
    user: info,
  });
});

// ************* available singleSlot Add  ****************

export const setSingleSlot = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  let { mdate, mtime } = req.body;
  const isValidtimes = isValidTime(mtime);
  if (!isValidtimes) {
    return next(new ErrorHandler("Invalid time format"));
  }
  mdate = isValidDate(mdate);
  if (!mdate) {
    return next(new ErrorHandler("Invalid date format"));
  }

  let info = await MentorProfiles.findOne({ user: id });
  if (info) {
    info.singleslot.push({ mdate, mtime });
    await info.validate();
    await info.save();
  } else {
    info = await MentorProfiles.create({
      singleslot: { mdate, mtime },
      user: id,
    });
  }

  res.status(200).json({
    success: true,
    user: info,
  });
});
// ************* available singleSlot update  ****************
export const updateSingleSlot = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  let { mdate, mtime } = req.body;
  const singleslot_id = req.params.id;

  const isValidtimes = isValidTime(mtime);
  if (!isValidtimes) {
    return next(new ErrorHandler("Invalid time format", 400));
  }
  mdate = isValidDate(mdate);
  if (!mdate) {
    return next(new ErrorHandler("Invalid date format"));
  }

  let info = await MentorProfiles.findOne({ user: id });
  if (!info) {
    return next(new ErrorHandler("user not found", 400));
  }

  const indexToUpdate = info.singleslot.findIndex(
    (slot) => slot._id.toString() === singleslot_id
  );

  if (indexToUpdate == -1) {
    return next(new ErrorHandler("Object not found", 400));
  }

  info.singleslot[indexToUpdate].set({ mdate, mtime });
  await info.validate();
  await info.save();
  res.status(200).json({
    success: true,
    user: info,
  });
});
// ************* available singleSlot Delete  ****************
export const deleteSingleSlot = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const singleSlot_id = req.params.id;

  let info = await MentorProfiles.findOneAndUpdate(
    { user: id, "singleslot._id": singleSlot_id },
    { $pull: { singleslot: { _id: singleSlot_id } } },
    { new: true }
  );

  if (!info) {
    return next(new ErrorHandler("user or object not found"));
  }
  await info.save();

  res.status(200).json({
    success: true,
    user: info,
  });
});

// ************* Recurring available slot add ****************

export const addRecurringSlot = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  let { mdays, mtime } = req.body;

  const isValidtimes = isValidTime(mtime);
  if (!isValidtimes) {
    return next(new ErrorHandler("Invalid time format", 400));
  }

  let info = await MentorProfiles.findOne({ user: id });

  if (info) {
    info.recuringSlot.push({
      mdays,
      mtime,
    });
    await info.validate();
    await info.save();
  } else {
    info = await MentorProfiles.create({
      recuringSlot: { mdays, mtime },
      user: id,
    });
  }
  await info.save();

  res.status(200).json({
    success: true,
    user: info,
  });
});

// ************* Recurring available slot UPDATE ****************

export const updateRecurringSlot = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  let { mdays, mtime } = req.body;

  const rc_id = req.params.id;

  const isValidtimes = isValidTime(mtime);
  if (!isValidtimes) {
    return next(new ErrorHandler("Invalid time format", 400));
  }

  let info = await MentorProfiles.findOne({ user: id });
  if (!info) {
    return next(new ErrorHandler("user not found", 400));
  }

  const indexToUpdate = info.recuringSlot.findIndex(
    (slot) => slot._id.toString() === rc_id
  );

  if (indexToUpdate == -1) {
    return next(new ErrorHandler("Object not found", 400));
  }

  info.recuringSlot[indexToUpdate].set({ mdays, mtime });
  await info.validate();
  await info.save();

  res.status(200).json({
    success: true,
    user: info,
  });
});

// ************* available reuccuring slot Delete  ****************
export const deleteRecurringSlot = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const rc_id = req.params.id;

  let info = await MentorProfiles.findOneAndUpdate(
    { user: id, "recuringSlot._id": rc_id },
    { $pull: { recuringSlot: { _id: rc_id } } },
    { new: true }
  );

  if (!info) {
    return next(new ErrorHandler("user or object not found"));
  }
  await info.save();

  res.status(200).json({
    success: true,
    user: info,
  });
});

// ************* Meet link Set ****************
export const setMeetLink = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;
  const { meetlink } = req.body;

  let info = await MentorProfiles.findOne({ user: id });

  if (info) {
    info.meetlink = meetlink;
    await info.validate();
    await info.save();
  } else {
    info = await MentorProfiles.create({
      meetlink: meetlink,
      user: id,
    });
  }

  res.status(200).json({
    success: true,
    user: info,
  });
});

// *************  Meet link Delete ****************
export const deleteMeetLink = catchAsyncError(async (req, res, next) => {
  let { user, id, userType, email } = req;

  let info = await MentorProfiles.findOne({ user: id });

  if (info) {
    info.meetlink = "No available link";
    await info.validate();
    await info.save();
  } else {
    info = await MentorProfiles.create({
      meetlink: "No available link",
      user: id,
    });
  }

  res.status(200).json({
    success: true,
    user: info,
  });
});
