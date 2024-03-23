import Router from "express";

import { hrController } from "../controllers/hr.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { fileMiddleware } from "../middleware/file.middleware";

const router = Router();

router.get("/me", authMiddleware.checkHRAccessToken, hrController.getMe);

router.patch("/me", authMiddleware.checkHRAccessToken, hrController.updateMe);

router.delete("/me", authMiddleware.checkHRAccessToken, hrController.deleteMe);

router.put(
  "/my-avatar",
  authMiddleware.checkHRAccessToken,
  fileMiddleware.isAvatarValid,
  hrController.uploadHRAvatar,
);

router.delete(
  "/my-avatar",
  authMiddleware.checkHRAccessToken,
  hrController.deleteHRAvatar,
);
export const hrRouter = router;
