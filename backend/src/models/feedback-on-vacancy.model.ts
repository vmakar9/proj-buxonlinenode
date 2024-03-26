import { model, Schema, Types } from "mongoose";

import { Candidate } from "./candidate.model";
import { Vacancy } from "./vacancy.model";

const FeedbackOnVacancySchema = new Schema(
  {
    vacancy_id: {
      type: Types.ObjectId,
      required: true,
      ref: Vacancy,
    },
    candidate_id: {
      type: Types.ObjectId,
      required: true,
      ref: Candidate,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const FeedbackOnVacancy = model(
  "Feedback on Vacancy",
  FeedbackOnVacancySchema,
);
