import { NextFunction, Request, Response } from "express";

import { ApiError } from "../erorr/api.error";
import { Vacancy } from "../models/vacancy.model";
import { ICompanyTokenPayload } from "../types/token.type";

class VacancyMiddeleware {
  public async getVacancyCompanyAccess(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { vacancyId } = req.params;
      const { _id } = req.res.locals.jwtPayload as ICompanyTokenPayload;
      const vacancy = await Vacancy.findById(vacancyId);

      if (vacancy.company != _id) {
        throw new ApiError("Access denied", 401);
      }

      req.res.locals = vacancy;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const vacancyMiddleware = new VacancyMiddeleware();
