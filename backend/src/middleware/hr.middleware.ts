import { NextFunction, Request, Response } from "express";

import { ApiError } from "../erorr/api.error";
import { HR } from "../models/hr.model";
import { IHR } from "../types/hr.type";
import { IHRTokenPayload } from "../types/token.type";

class HrMiddleware {
  public getDynamicallyAndThrow(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof IHR = "email",
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];
        const hr = await HR.findOne({ [dbField]: fieldValue });

        if (hr) {
          throw new ApiError(
            `HR with ${fieldName} ${fieldValue} already exist`,
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
    dbField: keyof IHR = "email",
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];
        const hr = await HR.findOne({ [dbField]: fieldValue });

        if (!hr) {
          throw new ApiError("HR not found", 422);
        }
        req.res.locals = { hr };
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async isHRValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.res.locals.jwtPayload as IHRTokenPayload;

      const hr = await HR.findById(_id);

      if (hr.status != "verified") {
        throw new ApiError("Your account not verified or blocked", 403);
      }
      res.locals.hr = hr;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const hrMiddleware = new HrMiddleware();
