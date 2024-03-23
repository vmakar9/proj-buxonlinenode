import { model, Schema, Types } from "mongoose";

import { EEnglishLevel } from "../enum/english-level.enum";
import { ENatureOfWork } from "../enum/nature-of-work.enum";
import { ETypeJob } from "../enum/type-job.enum";
import { Company } from "./company.model";

const vacancySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    type_job: {
      type: String,
      enum: ETypeJob,
      required: true,
    },
    english_level: {
      type: String,
      enum: EEnglishLevel,
      required: true,
    },
    nature_of_work: {
      type: String,
      enum: ENatureOfWork,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    social_packages: {
      type: String,
      required: true,
    },
    additional_information: {
      type: String,
      required: false,
    },
    company: {
      type: Types.ObjectId,
      required: true,
      ref: Company,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Vacancy = model("Vacancy", vacancySchema);
