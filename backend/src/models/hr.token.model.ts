import { model, Schema, Types } from "mongoose";

import { HR } from "./hr.model";

const hrTokenSchema = new Schema(
  {
    _hr_id: {
      type: Types.ObjectId,
      required: true,
      ref: HR,
    },
    accessHRToken: {
      type: String,
      required: true,
    },
    refreshHRToken: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const HRToken = model("HR Token", hrTokenSchema);
