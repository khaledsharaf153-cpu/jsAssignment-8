import { Schema, model } from "mongoose";
import { userGenderEnum } from "../../commen/enum/user.enum.js";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: [2, "minimum length for firstname is 2"],
      maxlength: [20, "maximum length for firstname is 20"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [2, "minimum length for lastname is 2"],
      maxlength: [20, "maximum length for lastname is 20"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: String,
    gender: {
      type: Number,
      enum: Object.values(userGenderEnum),
      default: userGenderEnum.MALE,
    },
    DOB: Date,
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    profilePicPath: String,
    coverPicPath: String,
    deletedAt: Date,
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema
  .virtual("username")
  .set(function (v) {
    const [firstname, lastname] = v.split(" ");
    this.set({ firstname, lastname });
  })
  .get(function () {
    return `${this.firstname} ${this.lastname}`;
  });

export const userModel = model("Users", userSchema);
