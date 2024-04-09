import { Types } from "mongoose";

import { ApiError } from "../erorr/api.error";
import { FeedbackOnVacancy } from "../models/feedback-on-vacancy.model";

class FeedbackonvacancyService {
  public async sendFeedBackOnVacancy(
    vacancyId: string,
    candidateId: string,
  ): Promise<void> {
    try {
      await FeedbackOnVacancy.create({
        vacancy_id: new Types.ObjectId(vacancyId),
        candidate_id: new Types.ObjectId(candidateId),
      });
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }
}

export const feedbackonvacancyService = new FeedbackonvacancyService();
