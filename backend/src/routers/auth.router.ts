import Router from "express";

import { authController } from "../controllers/auth.controller";
import { adminMiddleware } from "../middleware/admin.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { candidateMiddleware } from "../middleware/candidate.middleware";
import { companyMiddleware } from "../middleware/company.middleware";
import { hrMiddleware } from "../middleware/hr.middleware";

const router = Router();

router.post(
  "/candidate-register",
  candidateMiddleware.getDynamicallyAndThrow("email"),
  authController.candidateRegister,
);

router.post(
  "/candidate-login",
  candidateMiddleware.getDynamicallyOrThrow("email"),
  authController.candidateLogin,
);

router.post(
  "/hr-register",
  hrMiddleware.getDynamicallyAndThrow("email"),
  authController.hrRegister,
);

router.post(
  "/hr-login",
  hrMiddleware.getDynamicallyOrThrow("email"),
  authController.hrLogin,
);

router.post(
  "/company-register",
  companyMiddleware.getDynamicallyAndThrow("cooperative_email"),
  authController.companyRegister,
);

router.post(
  "/company-login",
  companyMiddleware.getDynamicallyOrThrow("cooperative_email"),
  authController.companyLogin,
);

router.post(
  "/refresh-candidate",
  authMiddleware.checkCandidateRefreshToken,
  authController.refreshCandidate,
);

router.post(
  "/refresh-hr",
  authMiddleware.checkHRRefreshToken,
  authController.refreshHR,
);

router.post(
  "/refresh-company",
  authMiddleware.checkCompanyRefreshToken,
  authController.refreshCompany,
);

router.post(
  "/change-password-candidate",
  authMiddleware.checkCandidateAccessToken,
  authController.changeCandidatePassword,
);

router.post(
  "/change-password-hr",
  authMiddleware.checkHRAccessToken,
  authController.changeHRPassword,
);

router.post(
  "/change-password-company",
  authMiddleware.checkCompanyAccessToken,
  authController.changeCompanyPassword,
);

router.post(
  "/forgot-password-candidate",
  candidateMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotCandidatePassword,
);

router.post(
  "/forgot-password-hr",
  hrMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotHRPassword,
);

router.post(
  "/forgot-password-company",
  companyMiddleware.getDynamicallyOrThrow("cooperative_email"),
  authController.forgotCompanyPassword,
);

router.post(
  "/admin-register",
  adminMiddleware.getDynamicallyAndThrow("email"),
  authController.adminRegister,
);

router.post(
  "/admin-login",
  adminMiddleware.getDynamicallyOrThrow("email"),
  authController.adminLogin,
);

router.post(
  "/refresh-admin",
  authMiddleware.checkAdminRefreshToken,
  authController.refreshAdmin,
);

router.post(
  "/change-password-admin",
  authMiddleware.checkAdminAccessToken,
  authController.changeAdminPassword,
);

router.post(
  "/forgot-password-admin",
  adminMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotAdminPassword,
);

router.patch(
  "/forgot-password-admin/:token",
  authController.setAdminForgotPassword,
);

router.put("/verify-admin/:token", authController.verifyAdmin);

router.patch(
  "/forgot-password-candidate/:token",
  authController.setCandidateForgotPassword,
);

router.patch("/forgot-password-hr/:token", authController.setHRForgotPassword);

router.patch(
  "/forgot-password-company/:token",
  authController.setCompanyForgotPassword,
);

router.put("/verify-candidate/:token", authController.verifyCandidate);

router.put("/verify-hr/:token", authController.verifyHR);

router.put("/verify-company/:token", authController.verifyCompany);

export const authRouter = router;
