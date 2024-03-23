import { model, Schema, Types } from "mongoose";

import { EActionTokenType } from "../enum/action-token-type.enum";
import { HR } from "./hr.model";

const actionTokenHRSchema = new Schema(
  {
    actionToken: {
      type: String,
      required: true,
    },
    tokenType: {
      type: String,
      enum: EActionTokenType,
      required: true,
    },
    _hr_id: {
      type: Types.ObjectId,
      required: true,
      ref: HR,
    },
  },
  { versionKey: false, timestamps: true },
);

export const ActionHRToken = model("Action HR Token", actionTokenHRSchema);
