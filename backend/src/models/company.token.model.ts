import { model, Schema, Types } from "mongoose";

import { Company } from "./company.model";

const companyTokenSchema = new Schema(
  {
    _company_id: {
      type: Types.ObjectId,
      required: true,
      ref: Company,
    },
    accessCompanyToken: {
      type: String,
      required: true,
    },
    refreshCompanyToken: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const CompanyToken = model("Company Token", companyTokenSchema);
