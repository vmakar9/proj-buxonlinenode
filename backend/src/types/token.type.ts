import { IAdmin } from "./admin.type";
import { ICandidate } from "./candidate.type";
import { ICompany } from "./company.type";
import { IHR } from "./hr.type";

export interface ICandidateTokenPair {
  accessCandidateToken: string;
  refreshCandidateToken: string;
}

export interface IHRTokenPair {
  accessHRToken: string;
  refreshHRToken: string;
}

export interface ICompanyTokenPair {
  accessCompanyToken: string;
  refreshCompanyToken: string;
}

export interface IAdminTokenPair {
  accessAdminToken: string;
  refreshAdminToken: string;
}

export type ICandidateTokenPayload = Pick<ICandidate, "_id">;

export type IHRTokenPayload = Pick<IHR, "_id">;

export type ICompanyTokenPayload = Pick<ICompany, "_id">;

export type IAdminTokenPayload = Pick<IAdmin, "_id">;

export type ICandidateActionTokenPayload = Pick<ICandidate, "_id">;

export type IHRActionTokenPayload = Pick<IHR, "_id">;

export type ICompanyActionTokenPayload = Pick<ICompany, "_id">;

export type IAdminActionTokenPayload = Pick<IAdmin, "_id">;
