import { model, Schema, Types } from "mongoose";

import { Candidate } from "./candidate.model";

const candidateTokenSchema = new Schema(
  {
    _candidate_id: {
      type: Types.ObjectId,
      required: true,
      ref: Candidate,
    },
    accessCandidateToken: {
      type: String,
      required: true,
    },
    refreshCandidateToken: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const CandidateToken = model("Candidate Token", candidateTokenSchema);
