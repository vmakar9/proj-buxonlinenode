import { NextFunction, Request, Response } from "express";

import { ApiError } from "../erorr/api.error";
import { Company } from "../models/company.model";
import { ICompany } from "../types/company.type";

class CompanyMiddleware {
  public getDynamicallyAndThrow(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof ICompany = "cooperative_email",
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];
        const company = await Company.findOne({ [dbField]: fieldValue });

        if (company) {
          throw new ApiError(
            `Company with ${fieldName} ${fieldValue} already exist`,
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
    dbField: keyof ICompany = "cooperative_email",
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];
        const company = await Company.findOne({ [dbField]: fieldValue });

        if (!company) {
          throw new ApiError("Company not found", 422);
        }
        req.res.locals = { company };
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const companyMiddleware = new CompanyMiddleware();
