import Router from "express";

import { companyController } from "../controllers/company.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { fileMiddleware } from "../middleware/file.middleware";

const router = Router();

router.get(
  "/my-company",
  authMiddleware.checkCompanyAccessToken,
  companyController.getMyCompany,
);

router.patch(
  "/my-company",
  authMiddleware.checkCompanyAccessToken,
  companyController.updateMyCompany,
);

router.delete(
  "/my-company",
  authMiddleware.checkCompanyAccessToken,
  companyController.deleteMyCompany,
);

router.put(
  "/my-company-avatar",
  authMiddleware.checkCompanyAccessToken,
  fileMiddleware.isAvatarValid,
  companyController.uploadCompanyAvatar,
);

router.delete(
  "/my-company-avatar",
  authMiddleware.checkCompanyAccessToken,
  companyController.deleteCompanyAvatar,
);

export const companyRouter = router;
