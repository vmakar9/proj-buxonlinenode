import Router from "express";

import { feedbackonvacancyController } from "../controllers/feedbackonvacancy.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { candidateMiddleware } from "../middleware/candidate.middleware";

const router = Router();

router.post(
  "/:vacancyId",
  authMiddleware.checkCandidateAccessToken,
  candidateMiddleware.isCandidateValid,
  feedbackonvacancyController.sendFeedbackonVacancy,
);

export const feedbackonvacancyRouter = router;
