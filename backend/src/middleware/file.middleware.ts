import { NextFunction, Request, Response } from "express";

import { avatarConfig } from "../configs/avatar.config";
import { cvConfig } from "../configs/cv.config";
import { ApiError } from "../erorr/api.error";

class FileMiddleware {
  public isCVValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        throw new ApiError("No files to upload", 400);
      }
      if (Array.isArray(req.files.CV)) {
        throw new ApiError("You can upload only one CV", 400);
      }
      const { size, mimetype, name } = req.files.CV;
      if (size > cvConfig.MAX_SIZE) {
        throw new ApiError(`File ${name} is too big`, 400);
      }
      if (!cvConfig.MIMETYPES.includes(mimetype)) {
        throw new ApiError(`File ${name} has invalid format`, 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public isAvatarValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        throw new ApiError("No files to upload", 400);
      }
      if (Array.isArray(req.files.avatar)) {
        throw new ApiError("You can upload only one avatar", 400);
      }
      const { size, mimetype, name } = req.files.avatar;
      if (size > avatarConfig.MAX_SIZE) {
        throw new ApiError(`File ${name} is too big`, 400);
      }
      if (!avatarConfig.MIMETYPES.includes(mimetype)) {
        throw new ApiError(`File ${name} has invalid format`, 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
