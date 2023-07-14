import catchAsyncError from "../../middleware/catchAsynchError.js";
import ErrorHandler from "../../utils/errorHandler.js";
import sendToken from "../../utils/sendtoken.js";
import { userModal } from "../../modal/userModal.js";
import { AdditionalInfoModel } from "../../modal/employer/AdditionalInfo.js";
export const UpdateEmployerPersonalInfo = catchAsyncError(
  async (req, res, next) => {
    // ! dont trust user given in body email , take out email from jwt and then do search result
    console.log(req.body);

    let user = await userModal.findOne({
      email: req.email,
      userType: req.userType,
    });
    if (!user) return next(new ErrorHandler("User not found", 404));

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.contact || user.phoneNumber;
    user.companyName = req.body.companyName || user.companyName;
    user.birthdate = req.body.birthDate || user.birthdate;
    user.address.state = req.body.state || user.address.state;
    user.address.city = req.body.city || user.address.city;
    user.address.landMark = req.body.landMark || user.address.landMark;
    user.address.pinCode = req.body.pinCode || user.address.pinCode;

    user = await user.save();

    res.status(200).json({
      success: true,
      data: "Updating employer information",
      user,
    });
  }
);

export const GetPersonalInfo = catchAsyncError(async (req, res, next) => {
  const { email, userType, _id } = req;
  if (userType != "employer")
    return next(new Error("Unauthorized access", 401));
  let user = await userModal
    .findOne({ email: email, userType: userType })
    .select("-password");
  if (!user) return next(new ErrorHandler("No user found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

// ********* Additional INformation Schema ************* [ setting req.id or req.email form isAuth ]
// we can separate this email into isAuthenticated
export const addAdditionalInfo = catchAsyncError(async (req, res, next) => {
  const { aboutCompany, mentor } = req.body;
  const _id = req.id;
  const email = req.email;
  const userType = req.userType;

  let user = await userModal.findOne({ email: email, userType: userType });

  if (!user) next(new ErrorHandler("UnAuthorized access", 400));

  let info = await AdditionalInfoModel.findOne({ user: _id });
  // console.log(info);
  if (info) {
    info.aboutCompany = aboutCompany || info.aboutCompany;
    if (!info.recommendedMentor.includes(mentor)) {
      info.recommendedMentor.push(mentor);
    }
    await info.save();
  } else {
    info = await AdditionalInfoModel.create({
      aboutCompany: aboutCompany,
      user: req.id,
      recommendedMentor: mentor,
    });
  }

  res.status(201).json({
    success: true,
    info,
  });
});

export const updateAdditionalInfo = catchAsyncError(
  async (res, req, next) => {}
);
