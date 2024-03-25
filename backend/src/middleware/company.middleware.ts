import { NextFunction, Request, Response } from "express";

import { ApiError } from "../erorr/api.error";
import { Company } from "../models/company.model";
import { ICompany } from "../types/company.type";
import { ICompanyTokenPayload } from "../types/token.type";

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

  public async isCompanyValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.res.locals.jwtPayload as ICompanyTokenPayload;

      const company = await Company.findById(_id);

      if (company.status != "verified") {
        throw new ApiError("Your account not verified or blocked", 403);
      }
      res.locals.company = company;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const companyMiddleware = new CompanyMiddleware();
