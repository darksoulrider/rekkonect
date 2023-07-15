import multer from "multer";
import ErrorHandler from "../utils/errorHandler.js";
const storage = multer.memoryStorage();

// * Employer uploading *

export const profileFiles = multer(console.log("mack"), {
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file) {
      cb(new ErrorHandler("No file given..", 400));
    } else if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(
        new ErrorHandler(
          "Only image and video files of size 15mb allowed ",
          400
        )
      );
    }
  },
  limits: { fileSize: 15 * 1024 * 1024 },
}).array("files", 1);

// import multer from "multer";
// const storage = multer.memoryStorage();
// const singleUpload = multer({ storage }).single("file");
// export default singleUpload;
