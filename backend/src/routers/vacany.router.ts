import Router from "express";

import { vacancyController } from "../controllers/vacancy.controller";
import { authMiddleware } from "../middleware/auth.middleware";

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
  vacancyController.updateById,
);

router.delete(
  "/:vacancyId",
  authMiddleware.checkCompanyAccessToken,
  vacancyController.deleteById,
);

export const vacancyRouter = router;
