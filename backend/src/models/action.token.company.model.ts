import { model, Schema, Types } from "mongoose";

import { EActionTokenType } from "../enum/action-token-type.enum";
import { Company } from "./company.model";

const actionTokenCompanySchema = new Schema(
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
    _company_id: {
      type: Types.ObjectId,
      required: true,
      ref: Company,
    },
  },
  { versionKey: false, timestamps: true },
);

export const ActionCompanyToken = model(
  "Action Company Token",
  actionTokenCompanySchema,
);
