import { NextFunction, Request, Response } from "express";

import { EAdminTokenType } from "../enum/admin-token-type.enum";
import { ECandidateTokenEnum } from "../enum/candidate-token-type.enum";
import { ECompanyTokenEnum } from "../enum/company-token-type.enum";
import { EHRTokenEnum } from "../enum/hr-token-type.enum";
import { ApiError } from "../erorr/api.error";
import { AdminToken } from "../models/admin.token.model";
import { CandidateToken } from "../models/candidate.token.model";
import { CompanyToken } from "../models/company.token.model";
import { HRToken } from "../models/hr.token.model";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkCandidateAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tokenString = req.get("Authorization");
      if (!tokenString) {
        throw new ApiError("No token", 401);
      }

      const accessCandidateToken = tokenString.split("Bearer ")[1];

      const jwtPayload = tokenService.checkCandidateToken(
        accessCandidateToken,
        ECandidateTokenEnum.accessCandidate,
      );
      const tokenInfo = await CandidateToken.findOne({ accessCandidateToken });
      req.res.locals = { jwtPayload, tokenInfo };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkCandidateRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tokenString = req.get("Authorization");
      if (!tokenString) {
        throw new ApiError("No token", 401);
      }

      const refreshCandidateToken = tokenString.split("Bearer ")[1];

      const jwtPayload = tokenService.checkCandidateToken(
        refreshCandidateToken,
        ECandidateTokenEnum.refreshCandidate,
      );
      const tokenInfo = await CandidateToken.findOne({ refreshCandidateToken });
      req.res.locals = { jwtPayload, tokenInfo };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkHRAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tokenString = req.get("Authorization");
      if (!tokenString) {
        throw new ApiError("No token", 401);
      }

      const accessHRToken = tokenString.split("Bearer ")[1];

      const jwtPayload = tokenService.checkHRToken(
        accessHRToken,
        EHRTokenEnum.accessHR,
      );
      const tokenInfo = await HRToken.findOne({ accessHRToken });
      req.res.locals = { jwtPayload, tokenInfo };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkHRRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tokenString = req.get("Authorization");
      if (!tokenString) {
        throw new ApiError("No token", 401);
      }

      const refreshHRToken = tokenString.split("Bearer ")[1];

      const jwtPayload = tokenService.checkHRToken(
        refreshHRToken,
        EHRTokenEnum.refreshHR,
      );
      const tokenInfo = await HRToken.findOne({ refreshHRToken });
      req.res.locals = { jwtPayload, tokenInfo };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkCompanyAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tokenString = req.get("Authorization");
      if (!tokenString) {
        throw new ApiError("No token", 401);
      }

      const accessCompanyToken = tokenString.split("Bearer ")[1];

      const jwtPayload = tokenService.checkCompanyToken(
        accessCompanyToken,
        ECompanyTokenEnum.accessCompany,
      );
      const tokenInfo = await CompanyToken.findOne({ accessCompanyToken });
      req.res.locals = { jwtPayload, tokenInfo };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkCompanyRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tokenString = req.get("Authorization");
      if (!tokenString) {
        throw new ApiError("No token", 401);
      }

      const refreshCompanyToken = tokenString.split("Bearer ")[1];

      const jwtPayload = tokenService.checkCompanyToken(
        refreshCompanyToken,
        ECompanyTokenEnum.refreshCompany,
      );
      const tokenInfo = await CompanyToken.findOne({ refreshCompanyToken });
      req.res.locals = { jwtPayload, tokenInfo };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkAdminAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tokenString = req.get("Authorization");
      if (!tokenString) {
        throw new ApiError("No token", 401);
      }

      const accessAdminToken = tokenString.split("Bearer ")[1];

      const jwtPayload = tokenService.checkAdminToken(
        accessAdminToken,
        EAdminTokenType.accessAdmin,
      );
      const tokenInfo = await AdminToken.findOne({ accessAdminToken });
      req.res.locals = { jwtPayload, tokenInfo };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkAdminRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tokenString = req.get("Authorization");
      if (!tokenString) {
        throw new ApiError("No token", 401);
      }

      const refreshAdminToken = tokenString.split("Bearer ")[1];

      const jwtPayload = tokenService.checkAdminToken(
        refreshAdminToken,
        EAdminTokenType.refreshAdmin,
      );
      const tokenInfo = await AdminToken.findOne({ refreshAdminToken });
      req.res.locals = { jwtPayload, tokenInfo };
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
