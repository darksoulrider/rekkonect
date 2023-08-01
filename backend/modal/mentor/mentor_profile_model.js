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
    availableslots: {
      singleslot: {
        mdate: {
          type: Date,
          required: [this?.availableslots?.singleslot, "date is required"],
          //   validate date
        },
        mtime: {
          type: String,
          required: [this?.availableslots?.singleslot, "time is required"],
          //   put validation on time
        },
      },
      recuringSlot: {
        mdays: [
          {
            type: String,
            required: [this?.availableslots?.recuringSlot, "day is required"],
            enum: {
              values: days,
              message: "not matched weekdays",
            },
          },
        ],
        mtime: {
          type: String,
          required: [this?.availableslots?.recuringSlot, "time is required"],
          //   put validation on time
        },
      },
    },
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
          type: Boolean,
          default: false,
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
        phone: {
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
      type: Number,
      min: [0, "minimum 0 fees required"],
      max: [1300, "maximum 1300 fees required"],
    },
  },
  { validateBeforeSave: true, timestamps: true }
);

export const MentorProfiles = mongoose.model("MentorProfile", MentorProfile);
