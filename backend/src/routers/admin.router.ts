import Router from "express";

import { adminController } from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", authMiddleware.checkAdminAccessToken, adminController.getMe);

router.patch(
  "/me",
  authMiddleware.checkAdminAccessToken,
  adminController.updateMe,
);

router.delete(
  "/me",
  authMiddleware.checkAdminAccessToken,
  adminController.deleteMe,
);

export const adminRouter = router;
