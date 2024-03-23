import { model, Schema } from "mongoose";

import { EAccountStatusEnum } from "../enum/account-status.enum";
import { ECompanySpecialization } from "../enum/company-specialization.enum";

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cooperative_email: {
      type: String,
      required: true,
    },
    site_link: {
      type: String,
    },
    specialization: {
      type: String,
      enum: ECompanySpecialization,
      required: false,
    },
    foundation_date: {
      type: String,
      required: false,
    },
    employees_qty: {
      type: Number,
      required: false,
    },
    projects_qty: {
      type: Number,
      required: false,
    },
    countries_qty: {
      type: Number,
      required: false,
    },
    world_offices: {
      type: String,
      required: false,
    },
    main_office: {
      type: String,
      required: false,
    },
    ukraine_offices: {
      type: String,
      required: false,
    },
    interview_stages: {
      type: String,
      required: false,
    },
    social_packages: {
      type: String,
      required: false,
    },
    about_company: {
      type: String,
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

export const Company = model("Company", companySchema);
