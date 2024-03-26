import { Types } from "mongoose";

import { ICandidate } from "./candidate.type";
import { IVacancy } from "./vacancy.type";

export interface IFeedbackonvacacny {
  vacancy_id: IVacancy | Types.ObjectId;
  candidate_id: ICandidate | Types.ObjectId;
}
