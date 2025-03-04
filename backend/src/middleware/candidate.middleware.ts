import { NextFunction, Request, Response } from "express";

import { ApiError } from "../erorr/api.error";
import { Candidate } from "../models/candidate.model";
import { ICandidate } from "../types/candidate.type";
import { ICandidateTokenPayload } from "../types/token.type";

class CandidateMiddleware {
  public getDynamicallyAndThrow(
    fieldName: string,
    from: "body" | "query" | "params" = "body",
    dbField: keyof ICandidate = "email",
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];
        const candidate = await Candidate.findOne({ [dbField]: fieldValue });

        if (candidate) {
          throw new ApiError(
            `Candidate with ${fieldName} ${fieldValue} already exist`,
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
    dbField: keyof ICandidate = "email",
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];
        const candidate = await Candidate.findOne({ [dbField]: fieldValue });

        if (!candidate) {
          throw new ApiError("Candidate not found", 422);
        }
        req.res.locals = { candidate };
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async isCandidateValid(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { _id } = req.res.locals.jwtPayload as ICandidateTokenPayload;

      const candidate = await Candidate.findById(_id);

      if (candidate.status != "verified") {
        throw new ApiError("Your account not verified or blocked", 403);
      }
      res.locals.candidate = candidate;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const candidateMiddleware = new CandidateMiddleware();
