import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";

//  **** week days ***
const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const MentorProfile = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      unique: true,
    },

    singleslot: [
      {
        mdate: {
          type: Date,
          required: [true, "date is required"],
          validate: {
            validator: (value) => {
              const d = new Date();
              if (value < d) {
                throw new Error("Date should not represent past");
              }
            },
          },
        },
        mtime: {
          type: String,
          required: [true, "time is required"],
        },
      },
    ],
    recuringSlot: [
      {
        mdays: {
          type: [String],
          required: [true, "day is required"],
          enum: {
            values: days,
            message: "not matched weekdays",
          },
        },
        mtime: {
          type: String,
          required: [true, "time is required"],
        },
      },
    ],
    education: [
      {
        college: {
          type: String,
          required: [true, "College is Required"],
          minLength: [6, "Minimum 6 characters required"],
        },
        course: {
          type: String,
          required: [true, "Course is Required"],
          minLength: [3, "Minimum 3 characters required"],
        },
        startyear: {
          type: Date,
          required: [true, "startYear is Required"],
        },
        endyear: {
          type: Date,
          required: [true, "endYear is Required"],
        },
      },
    ],
    experience: [
      {
        companyname: {
          type: String,
          required: [true, "companyName is Required"],
          minLength: [3, "Minimum 3 character is required"],
        },
        Role: {
          type: String,
          required: [true, "Role is Required"],
          minLength: [3, "Minimum 3 character is required"],
        },
        from: {
          type: Date,
          required: [true, "From Date is Required"],
        },
        to: {
          type: Date,
          required: [true, "To Date is Required"],
        },
        description: {
          type: String,
          required: [true, "Description is Required"],
          minLength: [10, "minimum 10 characters required"],
        },
        status: {
          type: String,
          default: "N/A",
        },
      },
    ],
    skills: [
      {
        type: String,
        minLength: [2, "minimum 2 characters required."],
      },
    ],
    languages: [
      {
        type: String,
        minLength: [2, "minimum 2 characters required."],
      },
    ],
    meetlink: {
      type: String,
      minLength: [4, "minimum 4 characters required."],
    },
    your11: [
      {
        name: {
          type: String,
          required: [true, "your 11 name is required"],
          minLength: [2, "minimum 2 characters required"],
        },
        linkdin: {
          // check if this is given or phone number is mandatory
          type: String,
          required: [true, "link is required"],
          minLength: [5, "minimum 5 characters required"],
          validate: {
            // check if linkdin link
            validator: () => {},
          },
        },
        contact: {
          type: String,
          required: [true, "phone number  is required"],
          minLength: [10, "minimum 10 integers required"],
          maxLength: [10, "maximum 10 integers required"],
          validate: {
            validator: (value) => {
              if (!validator.isNumeric(value)) {
                throw new Error("Phone number must be numeric value");
              }
            },
          },
        },
        why: {
          type: String,
          required: [true, "why is required"],
          minLength: [6, "minimum 6 characters required"],
        },
      },
    ],
    sessioncharge: {
      type: String,
      validate: {
        validator: (value) => {
          if (!validator.isNumeric(value)) {
            throw new Error("session charge must be a number");
          }
          const num = parseFloat(value);
          if (num < 0 || num > 1300) {
            throw new Error(
              "session charge must be between 0 to 1300 a number"
            );
          }
        },
      },
    },
  },
  { validateBeforeSave: true, timestamps: true }
);

export const MentorProfiles = mongoose.model("MentorProfile", MentorProfile);
