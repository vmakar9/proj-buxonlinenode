import { NextFunction, Request, Response } from "express";

import { ApiError } from "../erorr/api.error";
import { Admin } from "../models/admin.model";
import { IAdmin } from "../types/admin.type";

class AdminMiddleware {
  public getDynamicallyAndThrow(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof IAdmin = "email",
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];
        const admin = await Admin.findOne({ [dbField]: fieldValue });

        if (admin) {
          throw new ApiError(
            `Admin with ${fieldName} ${fieldValue} already exist`,
            409,
          );
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public getDynamicallyOrThrow(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof IAdmin = "email",
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];
        const admin = await Admin.findOne({ [dbField]: fieldValue });

        if (!admin) {
          throw new ApiError("Admin not found", 422);
        }
        req.res.locals = { admin };
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const adminMiddleware = new AdminMiddleware();
