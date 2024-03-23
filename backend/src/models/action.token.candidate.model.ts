import { model, Schema, Types } from "mongoose";

import { EActionTokenType } from "../enum/action-token-type.enum";
import { Candidate } from "./candidate.model";

const actionTokenCandidateSchema = new Schema(
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
    _candidate_id: {
      type: Types.ObjectId,
      required: true,
      ref: Candidate,
    },
  },
  { versionKey: false, timestamps: true },
);

export const ActionCandidateToken = model(
  "Action Candidate Token",
  actionTokenCandidateSchema,
);
