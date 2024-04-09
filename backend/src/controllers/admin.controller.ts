import { NextFunction, Request, Response } from "express";

import { adminService } from "../services/admin.service";
import { IAdmin } from "../types/admin.type";
import { IAdminTokenPayload } from "../types/token.type";

class AdminController {
  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IAdminTokenPayload;
      const admin = await adminService.getMe(jwtPayload);
      res.status(200).json(admin);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IAdminTokenPayload;
      const body = req.body as Partial<IAdmin>;

      const admin = await adminService.updateMe(jwtPayload, body);

      res.status(201).json(admin);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IAdminTokenPayload;

      await adminService.deleteMe(jwtPayload);

      res.sendStatus(204).json("Account deleted");
    } catch (e) {
      next(e);
    }
  }
}

export const adminController = new AdminController();
