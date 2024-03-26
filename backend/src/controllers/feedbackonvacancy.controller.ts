import { NextFunction, Request, Response } from "express";

import { feedbackonvacancyService } from "../services/feedbackonvacancy.service";
import { ICandidateTokenPayload } from "../types/token.type";

class FeedbackonvacancyController {
  public async sendFeedbackonVacancy(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { _id } = req.res.locals.jwtPayload as ICandidateTokenPayload;
      const { vacancyId } = req.params;
      await feedbackonvacancyService.sendFeedBackOnVacancy(vacancyId, _id);
      res.status(200).json("Feedback sent");
    } catch (e) {
      next(e);
    }
  }
}

export const feedbackonvacancyController = new FeedbackonvacancyController();
