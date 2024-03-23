import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth.service";
import { IChangePassword } from "../types/auth.type";
import {
  IAdminTokenPayload,
  ICandidateTokenPayload,
  ICompanyTokenPayload,
  IHRTokenPayload,
} from "../types/token.type";

class AuthController {
  public async candidateRegister(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await authService.candidateRegister(req.body);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async candidateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { candidate } = req.res.locals;
      const tokenPair = await authService.candidateLogin(
        { email, password },
        candidate,
      );
      return res.status(201).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async hrRegister(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.hrRegister(req.body);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async hrLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { hr } = req.res.locals;
      const tokenPair = await authService.hrLogin({ email, password }, hr);
      return res.status(201).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async companyRegister(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await authService.companyRegister(req.body);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async companyLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { cooperative_email, password } = req.body;
      const { company } = req.res.locals;
      const tokenPair = await authService.companyLogin(
        { cooperative_email, password },
        company,
      );
      return res.status(201).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async refreshCandidate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { tokenInfo, jwtPayload } = req.res.locals;
      const tokenPair = await authService.refreshCandidate(
        tokenInfo,
        jwtPayload,
      );
      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async refreshHR(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenInfo, jwtPayload } = req.res.locals;
      const tokenPair = await authService.refreshHR(tokenInfo, jwtPayload);
      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async refreshCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenInfo, jwtPayload } = req.res.locals;
      const tokenPair = await authService.refreshCompany(tokenInfo, jwtPayload);
      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async changeCandidatePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ICandidateTokenPayload;
      const body = req.body as IChangePassword;

      await authService.changeCandidatePassword(body, jwtPayload);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async changeHRPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IHRTokenPayload;
      const body = req.body as IChangePassword;

      await authService.changeHRPassword(body, jwtPayload);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async changeCompanyPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ICompanyTokenPayload;
      const body = req.body as IChangePassword;

      await authService.changeCompanyPassword(body, jwtPayload);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async forgotCandidatePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { candidate } = req.res.locals;

      await authService.forgotCandidatePassword(candidate);

      return res.json("OK");
    } catch (e) {
      next(e);
    }
  }

  public async setCandidateForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.params.token;
      const newPassword = req.body.newPassword;

      await authService.setForgotCandidatePassword(newPassword, token);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async forgotHRPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { hr } = req.res.locals;

      await authService.forgotHRPassword(hr);

      return res.json("OK");
    } catch (e) {
      next(e);
    }
  }

  public async setHRForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.params.token;
      const newPassword = req.body.newPassword;

      await authService.setForgotHRPassword(newPassword, token);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async forgotCompanyPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { company } = req.res.locals;

      await authService.forgotCompanyPassword(company);

      return res.json("OK");
    } catch (e) {
      next(e);
    }
  }

  public async setCompanyForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.params.token;
      const newPassword = req.body.newPassword;

      await authService.setForgotCompanyPassword(newPassword, token);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async verifyCandidate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.params.token;

      await authService.verifyCandidate(token);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async verifyHR(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token;

      await authService.verifyHR(token);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async verifyCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token;

      await authService.verifyCompany(token);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async adminRegister(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.adminRegister(req.body);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async adminLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { admin } = req.res.locals;
      const tokenPair = await authService.adminLogin(
        { email, password },
        admin,
      );
      return res.status(201).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async refreshAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { tokenInfo, jwtPayload } = req.res.locals;
      const tokenPair = await authService.refreshAdmin(tokenInfo, jwtPayload);
      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async changeAdminPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IAdminTokenPayload;
      const body = req.body as IChangePassword;

      await authService.changeAdminPassword(body, jwtPayload);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async forgotAdminPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { admin } = req.res.locals;

      await authService.forgotAdminPassword(admin);

      return res.json("OK");
    } catch (e) {
      next(e);
    }
  }

  public async setAdminForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.params.token;
      const newPassword = req.body.newPassword;

      await authService.setForgotAdminPassword(newPassword, token);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async verifyAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token;

      await authService.verifyAdmin(token);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
