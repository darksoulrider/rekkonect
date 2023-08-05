import validator from "validator";
import catchAsyncError from "../../middleware/catchAsynchError.js";
import ErrorHandler from "../../utils/errorHandler.js";
import { isValidTime, isValidDate } from "../../utils/helper/helper.js";
import { DateTime } from "luxon";

// ******* Modals imported
import { userModal } from "../../modal/userModal.js";
import { MentorSessionBook } from "../../modal/meetingbook/SessionBookModal.js";
import { MentorProfiles } from "../../modal/mentor/mentor_profile_model.js";

//  can invoke payment here and also send a email to successfully received payments

export const BookSession = catchAsyncError(async (req, res, next) => {
  console.log("reacched book session");
  const { user, id, email, userType } = req;
  const mentor_id = req.params.id;
  let data = req.body; // see if individual destructure possible
  delete data._id;
  data.mentoruser = mentor_id;
  data.menteeuser = id;

  // ********** Date and time checking ****************
  if (!data.mdate || !data.mtime) {
    return next(new ErrorHandler("Invalid date or time format. "));
  }
  let checktime = isValidTime(data.mtime);
  if (!checktime) {
    return next(new ErrorHandler("Invalid time format. "));
  }
  data.mdate = isValidDate(data.mdate);
  if (!data.mdate) {
    return next(new ErrorHandler("Invalid date format. "));
  }

  data.rescheduleMentor = 0;
  data.rescheduleMentee = 0;

  // ************* Not allow user to book self sessions ****************

  if (id == mentor_id) {
    return next(new ErrorHandler("You can not book your own session", 400));
  }

  // ******************** Get Mentor Profiles ************************
  let mentorProfile = await MentorProfiles.findOne({
    user: mentor_id,
  });
  if (!mentorProfile) {
    return next(new ErrorHandler("No Mentor found ", 400));
  }

  // ********** check available slots ****************

  let isSlotAvailable = false;
  for (const slt of mentorProfile.singleslot) {
    let udate = DateTime.fromJSDate(slt.mdate).toFormat("yyyy/MM/dd");

    if (udate == data.mdate && slt.mtime === data.mtime) {
      isSlotAvailable = true;
      break;
    }
  }

  if (!isSlotAvailable) {
    let uday = DateTime.fromFormat(data.mdate, "yyyy/MM/dd").toFormat("EEEE");
    uday = uday.toLowerCase();

    for (const sl of mentorProfile.recuringSlot) {
      const av_days = sl.mdays;

      for (let day of av_days) {
        if (day.toLowerCase() === uday && sl.mtime === data.mtime) {
          isSlotAvailable = true;
          break;
        }
      }
    }
  }

  if (!isSlotAvailable) {
    return next(new ErrorHandler("No Available slot"), 400);
  }

  const info = await MentorSessionBook.create(data);
  if (!info) {
    return next(new ErrorHandler("Faild to book the session"));
  }

  // ! Send eamil  to inform both the user
  res.status(200).json({
    success: true,
    session: info,
  });
});

// ************ Reschedule the session ****************************

export const rescheduleSession = catchAsyncError(async (req, res, next) => {
  console.log("reacched reschedule session");

  const { user, id, email, userType } = req;
  const session_id = req.params.id; // object id
  let { mdate, mtime } = req.body; // see if individual destructure possible

  // ********** Date and time checking ****************
  if (!mdate || !mtime) {
    return next(new ErrorHandler("Invalid date or time format. "));
  }
  let checktime = isValidTime(mtime);
  if (!checktime) {
    return next(new ErrorHandler("Invalid time format. "));
  }
  mdate = isValidDate(mdate);
  if (!mdate) {
    return next(new ErrorHandler("Invalid date format. "));
  }

  // **************** Check slot availability *************
  let info = await MentorSessionBook.findOne({ _id: session_id });

  if (!info) {
    return next(new ErrorHandler("No Session found"));
  }

  // ******************** Get Mentor Profiles ************************
  let mentorProfile = await MentorProfiles.findOne({ user: info.mentoruser });
  if (!mentorProfile) {
    return next(new ErrorHandler("No Mentor found ", 400));
  }

  let isSlotAvailable;

  for (const sl of mentorProfile.singleslot) {
    let udatee = DateTime.fromJSDate(sl.mdate).toFormat("yyyy/MM/dd");
    console.log(`single slot => ${udatee}`);
    if (udatee == mdate && sl.mtime == mtime) {
      isSlotAvailable = true;
      break;
    }
  }

  if (!isSlotAvailable) {
    let uday = DateTime.fromFormat(mdate, "yyyy/MM/dd").toFormat("EEEE");
    uday = uday.toLowerCase();

    for (const sl of mentorProfile.recuringSlot) {
      const av_days = sl.mdays;
      console.log(av_days);

      for (let day of av_days) {
        if (day.toLowerCase() == uday.toLowerCase() && sl.mtime == mtime) {
          isSlotAvailable = true;
          break;
        }
      }
    }
  }

  console.log("isSlotAvailable = " + isSlotAvailable);
  // isSlotAvailable = false; //! change this later on
  if (!isSlotAvailable) {
    return next(new ErrorHandler("No Available slot"), 400);
  }

  if (info.mentoruser == id) {
    // ********** for  mentor rescheduling meet ********

    if (parseInt(info.rescheduleMentor) >= 2) {
      return next(
        new ErrorHandler("You can not reschedule meeting more than 2 times")
      );
    }
    console.log(parseInt(info.rescheduleMentor));
    info.mdate = mdate;
    info.mtime = mtime;

    console.log("Initial mentor rescheder " + info.rescheduleMentor);
    info.rescheduleMentor = parseInt(info.rescheduleMentor) + 1;
    console.log("after mentor rescheder " + info.rescheduleMentor);

    info.reschedule = true;
    await info.validate();
    info = await info.save();
    //
  } else if (info.menteeuser == id) {
    // ********** for menteee rescheduling meet ********

    if (parseInt(info.rescheduleMentee) >= 1) {
      return next(
        new ErrorHandler("You can not reschedule meeting more than 1 times")
      );
    }
    info.mdate = mdate;
    info.mtime = mtime;

    console.log("Initial mentor rescheder " + info.rescheduleMentee);
    info.rescheduleMentee = parseInt(info.rescheduleMentee) + 1;
    console.log("Initial mentor rescheder " + info.rescheduleMentee);

    info.reschedule = true;
    await info.validate();
    info = await info.save();
    //
  } else {
    return next(new ErrorHandler("Something went wrong", 500));
  }

  // ! Send eamil  to inform both the user
  res.status(200).json({
    success: true,
    session: info,
  });
});

// ------------------ if payment controller _____________________
