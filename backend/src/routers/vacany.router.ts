import Router from "express";

import { vacancyController } from "../controllers/vacancy.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { vacancyMiddleware } from "../middleware/vacancy.middleware";

const router = Router();

router.post(
  "/publish",
  authMiddleware.checkCompanyAccessToken,
  vacancyController.publishVacancy,
);

router.get("/", vacancyController.getAll);

router.get("/:vacancyId", vacancyController.getById);

router.patch(
  "/:vacancyId",
  authMiddleware.checkCompanyAccessToken,
  vacancyMiddleware.getVacancyCompanyAccess,
  vacancyController.updateById,
);

router.delete(
  "/:vacancyId",
  authMiddleware.checkCompanyAccessToken,
  vacancyMiddleware.getVacancyCompanyAccess,
  vacancyController.deleteById,
);

export const vacancyRouter = router;
