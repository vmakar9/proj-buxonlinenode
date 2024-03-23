import { model, Schema, Types } from "mongoose";

import { EActionTokenType } from "../enum/action-token-type.enum";
import { Admin } from "./admin.model";

const actionTokenAdminSchema = new Schema(
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
    _admin_id: {
      type: Types.ObjectId,
      required: true,
      ref: Admin,
    },
  },
  { versionKey: false, timestamps: true },
);

export const ActionAdminToken = model(
  "Action Admin Token",
  actionTokenAdminSchema,
);
