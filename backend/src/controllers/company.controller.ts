import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { companyService } from "../services/company.service";
import { ICompany } from "../types/company.type";
import { ICompanyTokenPayload } from "../types/token.type";

class CompanyController {
  public async getMyCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ICompanyTokenPayload;
      const company = await companyService.getMyCompany(jwtPayload);
      res.status(200).json(company);
    } catch (e) {
      next(e);
    }
  }

  public async updateMyCompany(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ICompanyTokenPayload;
      const body = req.body as Partial<ICompany>;
      const company = await companyService.updateMyCompany(jwtPayload, body);
      res.status(201).json(company);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMyCompany(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ICompanyTokenPayload;
      await companyService.deleteMyCompany(jwtPayload);
      res.sendStatus(204).json("Your company successfully deleted ");
    } catch (e) {
      next(e);
    }
  }

  public async uploadCompanyAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ICompanyTokenPayload;
      const avatar = req.files.avatar as UploadedFile;
      const company = await companyService.uploadCompanyAvatar(
        avatar,
        jwtPayload,
      );
      res.status(201).json(company);
    } catch (e) {
      next(e);
    }
  }

  public async deleteCompanyAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ICompanyTokenPayload;
      const company = await companyService.deleteCompanyAvatar(jwtPayload);

      return res.status(201).json(company);
    } catch (e) {
      next(e);
    }
  }
}

export const companyController = new CompanyController();
