import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";

export const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);