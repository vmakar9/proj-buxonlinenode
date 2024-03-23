import { model, Schema } from "mongoose";

import { EAccountStatusEnum } from "../enum/account-status.enum";

const candidateSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    surname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    CV: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
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
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Candidate = model("Candidate", candidateSchema);
