import { NextFunction, Request, Response } from "express";

import { vacancyService } from "../services/vacancy.service";
import { ICompanyTokenPayload } from "../types/token.type";
import { IVacancy } from "../types/vacancy.type";

class VacancyController {
  public async publishVacancy(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.res.locals.jwtPayload as ICompanyTokenPayload;
      await vacancyService.publishVacancy(req.body, _id);
      res.status(201).json("Created");
    } catch (e) {
      next(e);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const vacancies = await vacancyService.getAll();
      return res.status(200).json(vacancies);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { vacancyId } = req.params;
      const vacancy = await vacancyService.getVacancyById(vacancyId);
      return res.json(vacancy);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { vacancyId } = req.params;
      const body = req.body as Partial<IVacancy>;
      const updatedVacancy = await vacancyService.updateVacancyById(
        vacancyId,
        body,
      );
      return res.status(201).json(updatedVacancy);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { vacancyId } = req.params;
      await vacancyService.deleteVacancyById(vacancyId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const vacancyController = new VacancyController();
