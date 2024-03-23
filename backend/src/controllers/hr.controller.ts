import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { hrService } from "../services/hr.service";
import { IHR } from "../types/hr.type";
import { IHRTokenPayload } from "../types/token.type";

class HrController {
  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IHRTokenPayload;
      const hr = await hrService.getMe(jwtPayload);
      res.json({ data: hr });
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IHRTokenPayload;
      const body = req.body as Partial<IHR>;
      const hr = await hrService.updateMe(jwtPayload, body);

      res.status(201).json(hr);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IHRTokenPayload;
      await hrService.deleteMe(jwtPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async uploadHRAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IHRTokenPayload;
      const avatar = req.files.avatar as UploadedFile;
      const hr = await hrService.uploadHRAvatar(avatar, jwtPayload);
      res.status(201).json(hr);
    } catch (e) {
      next(e);
    }
  }

  public async deleteHRAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IHRTokenPayload;
      const hr = await hrService.deleteHRAvatar(jwtPayload);

      return res.status(201).json(hr);
    } catch (e) {
      next(e);
    }
  }
}

export const hrController = new HrController();
