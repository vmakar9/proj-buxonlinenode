import { model, Schema } from "mongoose";

import { EAccountStatusEnum } from "../enum/account-status.enum";

const adminSchema = new Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      default: EAccountStatusEnum.not_verified,
      enum: EAccountStatusEnum,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Admin = model("Admin", adminSchema);
