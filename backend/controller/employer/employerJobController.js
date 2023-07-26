import catchAsyncError from "../../middleware/catchAsynchError.js";
import ErrorHandler from "../../utils/errorHandler.js";
import { Emp_JobModel } from "../../modal/employer/Emp_JobsModel.js";

// ! jobs controllers
//  * post a job
export const postJob = catchAsyncError(async (req, res, next) => {
  const { user, id, userType, email } = req;
  req.body.user = id; // geting from token
  delete req.body.applicants;

  req.body.workdays.firstday = req.body.workdays.firstday.toLowerCase();
  req.body.workdays.lastday = req.body.workdays.lastday.toLowerCase();

  const data = await Emp_JobModel.create(req.body);
  if (!data) {
    return next(new ErrorHandler("Job creation failed"));
  }
  res.status(200).json({
    success: true,
    data: data,
  });
});

//  * get all jobs
export const getAllJob = catchAsyncError(async (req, res, next) => {
  const { user, id, userType, email } = req;

  const alljob = await Emp_JobModel.find({ user: id }).populate("applicants");

  if (!alljob) {
    return next(new ErrorHandler("No job found", 404));
  }

  res.status(200).json({
    success: true,
    jobs: alljob,
    count: alljob.length,
  });
});

//  * get single  job *
export const getSingleJob = async (req, res, next) => {
  const { user, id, email, userType } = req;
  const jobid = req.params.id;

  const getjob = await Emp_JobModel.findOne({ _id: jobid });

  if (!getjob) {
    return next(new ErrorHandler("job not found", 404));
  }

  res.status(200).json({
    success: true,
    job: getjob,
  });
};

//  * update single job
export const updateSingleJob = catchAsyncError(async (req, res, next) => {
  const { user, id, email, userType } = req;
  const jobid = req.params.id;
  req.body.user = id; // you can delete this as well be not needed
  // security reasons
  delete req.body._id;
  delete req.body.applicants;
  req.body.workdays.firstday = req.body.workdays.firstday.toLowerCase();
  req.body.workdays.lastday = req.body.workdays.lastday.toLowerCase();

  const updatedJob = await Emp_JobModel.findOne({ _id: jobid });
  if (!updatedJob) {
    return next(new ErrorHandler("job not found", 404));
  }
  if (updatedJob.user != id) {
    return next(new ErrorHandler("Unauthorized request", 404));
  }

  const newupdate = await Emp_JobModel.findByIdAndUpdate(jobid, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: newupdate,
    job: "successfully updated",
  });
});
