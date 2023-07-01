import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const userRoles = ["candidate", "mentor", "employer"];

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name required"],
      minLength: [2, "Minimum 2 Characters required"],
      maxLength: [20, "Maximum 20 Characters required"],
    },
    lastname: {
      type: String,
      required: [true, "Last name required"],
      minLength: [2, "Minimum 2 Characters required"],
      maxLength: [20, "Maximum 20 Characters required"],
    },
    email: {
      type: String,
      required: [true, "Email address required"],
      validate: [Validator.isEmail, "Email address is not valid"],
      unique: [true, "Email address must be unique"],
    },
    password: {
      type: String,
      minLength: [8, "password length must be 8 characters long"],
    },
    googleLoginId: {
      type: String,
    },
    facebookLoginId: {
      type: String,
    },
    birthdate: {
      type: Date,
      required: [true, "Birthdate is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minLength: [10, "phone length should be 10 characters"],
      maxLength: [10, "phone length should be 10 characters"],
      unique: [true, "phone number must be unique"],
    },
    Bio: {
      type: String,
      maxLength: [300, "Maximum 300 characters required"],
    },
    isActiveSubscription: {
      type: Boolean,
      default: false,
    },
    address: {
      state: {
        type: String,
        required: [true, "State value is required"],
      },
      city: {
        type: String,
        required: [true, "City value is required"],
      },
      pinCode: {
        type: Number,
        required: [true, "Pincode value is required"],
      },
    },
    avatar: {
      imageId: {
        type: String,
        default: "image",
      },
      imageUrl: {
        type: String,
        default:
          "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isTermsAccepted: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      enum: {
        values: userRoles,
        message: "userType is not valid",
      },
      required: [true, "No user type given"],
    },
  },
  { timestamps: true }
);

//  write all the methods here regarding the schema before saving data
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

UserSchema.methods.getJWTToken = async function () {
  return await jwt.sign({ _id: this._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "5d",
  });
};

UserSchema.methods.comparePassword = async function (password) {
  return bcryptjs.compare(password, this.password);
};

export const userModal = mongoose.model("User", userSchema);

// bio is only for 2,3 lines of introduciton..
// see if state_ enup is possible
// check password if given or not from controller
// check birth date not less than 16 from model or controller

/*
if user sign in using googleid, see if present, if present then forward jwt and give acess or then save it first and then redirect jwt
note -> use all validation befoer giveing any access to user



*/
