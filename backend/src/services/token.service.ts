import * as jwt from "jsonwebtoken";

import { configs } from "../configs/configs";
import { EActionTokenType } from "../enum/action-token-type.enum";
import { EAdminTokenType } from "../enum/admin-token-type.enum";
import { ECandidateTokenEnum } from "../enum/candidate-token-type.enum";
import { ECompanyTokenEnum } from "../enum/company-token-type.enum";
import { EHRTokenEnum } from "../enum/hr-token-type.enum";
import { ApiError } from "../erorr/api.error";
import {
  IAdminActionTokenPayload,
  IAdminTokenPair,
  IAdminTokenPayload,
  ICandidateActionTokenPayload,
  ICandidateTokenPair,
  ICandidateTokenPayload,
  ICompanyActionTokenPayload,
  ICompanyTokenPair,
  ICompanyTokenPayload,
  IHRActionTokenPayload,
  IHRTokenPair,
  IHRTokenPayload,
} from "../types/token.type";

class TokenService {
  public generateCandidateToken(
    payload: ICandidateTokenPayload,
  ): ICandidateTokenPair {
    const accessCandidateToken = jwt.sign(
      payload,
      configs.JWT_CANDIDATE_ACCESS_SECRET,
      {
        expiresIn: "1h",
      },
    );
    const refreshCandidateToken = jwt.sign(
      payload,
      configs.JWT_CANDIDATE_REFRESH_SECRET,
      {
        expiresIn: "30h",
      },
    );
    return {
      accessCandidateToken,
      refreshCandidateToken,
    };
  }

  public generateHRToken(payload: IHRTokenPayload): IHRTokenPair {
    const accessHRToken = jwt.sign(payload, configs.JWT_HR_ACCESS_SECRET, {
      expiresIn: "1h",
    });
    const refreshHRToken = jwt.sign(payload, configs.JWT_HR_REFRESH_SECRET, {
      expiresIn: "30h",
    });
    return {
      accessHRToken,
      refreshHRToken,
    };
  }

  public generateCompanyToken(
    payload: ICompanyTokenPayload,
  ): ICompanyTokenPair {
    const accessCompanyToken = jwt.sign(
      payload,
      configs.JWT_COMPANY_ACCESS_SECRET,
      {
        expiresIn: "1h",
      },
    );
    const refreshCompanyToken = jwt.sign(
      payload,
      configs.JWT_COMPANY_REFRESH_SECRET,
      {
        expiresIn: "30h",
      },
    );
    return {
      accessCompanyToken,
      refreshCompanyToken,
    };
  }

  public checkCandidateToken(
    token: string,
    tokenType: ECandidateTokenEnum,
  ): ICandidateTokenPayload {
    try {
      let secret = "";
      switch (tokenType) {
        case ECandidateTokenEnum.accessCandidate:
          secret = configs.JWT_CANDIDATE_ACCESS_SECRET;
          break;
        case ECandidateTokenEnum.refreshCandidate:
          secret = configs.JWT_CANDIDATE_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ICandidateTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public checkHRToken(token: string, tokenType: EHRTokenEnum): IHRTokenPayload {
    try {
      let secret = "";
      switch (tokenType) {
        case EHRTokenEnum.accessHR:
          secret = configs.JWT_HR_ACCESS_SECRET;
          break;
        case EHRTokenEnum.refreshHR:
          secret = configs.JWT_HR_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as IHRTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public checkCompanyToken(
    token: string,
    tokenType: ECompanyTokenEnum,
  ): ICompanyTokenPayload {
    try {
      let secret = "";
      switch (tokenType) {
        case ECompanyTokenEnum.accessCompany:
          secret = configs.JWT_COMPANY_ACCESS_SECRET;
          break;
        case ECompanyTokenEnum.refreshCompany:
          secret = configs.JWT_COMPANY_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ICompanyTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public generateCandidateActionToken(
    payload: ICandidateActionTokenPayload,
    tokenType: EActionTokenType,
  ) {
    let secret = "";
    switch (tokenType) {
      case EActionTokenType.forgot:
        secret = configs.JWT_CANDIDATE_FORGOT_SECRET;
        break;
      case EActionTokenType.verify:
        secret = configs.JWT_CANDIDATE_VERIFY_SECRET;
        break;
    }

    return jwt.sign(payload, secret, {
      expiresIn: "3d",
    });
  }

  public checkCandidateActionToken(
    actionCandidateToken: string,
    type: EActionTokenType,
  ) {
    try {
      let secret = "";
      switch (type) {
        case EActionTokenType.forgot:
          secret = configs.JWT_CANDIDATE_FORGOT_SECRET;
          break;
        case EActionTokenType.verify:
          secret = configs.JWT_CANDIDATE_VERIFY_SECRET;
          break;
      }
      return jwt.verify(
        actionCandidateToken,
        secret,
      ) as ICandidateActionTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public generateHRActionToken(
    payload: IHRActionTokenPayload,
    tokenType: EActionTokenType,
  ) {
    let secret = "";
    switch (tokenType) {
      case EActionTokenType.forgot:
        secret = configs.JWT_HR_FORGOT_SECRET;
        break;
      case EActionTokenType.verify:
        secret = configs.JWT_HR_VERIFY_SECRET;
        break;
    }

    return jwt.sign(payload, secret, {
      expiresIn: "3d",
    });
  }

  public checkHRActionToken(actionHRToken: string, type: EActionTokenType) {
    try {
      let secret = "";
      switch (type) {
        case EActionTokenType.forgot:
          secret = configs.JWT_HR_FORGOT_SECRET;
          break;
        case EActionTokenType.verify:
          secret = configs.JWT_HR_VERIFY_SECRET;
          break;
      }
      return jwt.verify(actionHRToken, secret) as IHRActionTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public generateCompanyActionToken(
    payload: ICompanyActionTokenPayload,
    tokenType: EActionTokenType,
  ) {
    let secret = "";
    switch (tokenType) {
      case EActionTokenType.forgot:
        secret = configs.JWT_COMPANY_FORGOT_SECRET;
        break;
      case EActionTokenType.verify:
        secret = configs.JWT_COMPANY_VERIFY_SECRET;
        break;
    }

    return jwt.sign(payload, secret, {
      expiresIn: "3d",
    });
  }

  public checkCompanyActionToken(
    actionCompanyToken: string,
    type: EActionTokenType,
  ) {
    try {
      let secret = "";
      switch (type) {
        case EActionTokenType.forgot:
          secret = configs.JWT_COMPANY_FORGOT_SECRET;
          break;
        case EActionTokenType.verify:
          secret = configs.JWT_COMPANY_VERIFY_SECRET;
          break;
      }
      return jwt.verify(
        actionCompanyToken,
        secret,
      ) as ICompanyActionTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public generateAdminToken(payload: IAdminTokenPayload): IAdminTokenPair {
    const accessAdminToken = jwt.sign(
      payload,
      configs.JWT_ADMIN_ACCESS_SECRET,
      {
        expiresIn: "1h",
      },
    );
    const refreshAdminToken = jwt.sign(
      payload,
      configs.JWT_ADMIN_REFRESH_SECRET,
      {
        expiresIn: "30h",
      },
    );
    return {
      accessAdminToken,
      refreshAdminToken,
    };
  }

  public checkAdminToken(
    token: string,
    tokenType: EAdminTokenType,
  ): IAdminTokenPayload {
    try {
      let secret = "";
      switch (tokenType) {
        case EAdminTokenType.accessAdmin:
          secret = configs.JWT_ADMIN_ACCESS_SECRET;
          break;
        case EAdminTokenType.refreshAdmin:
          secret = configs.JWT_ADMIN_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as IAdminTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public generateAdminActionToken(
    payload: IAdminActionTokenPayload,
    tokenType: EActionTokenType,
  ) {
    let secret = "";
    switch (tokenType) {
      case EActionTokenType.forgot:
        secret = configs.JWT_ADMIN_FORGOT_SECRET;
        break;
      case EActionTokenType.verify:
        secret = configs.JWT_ADMIN_VERIFY_SECRET;
        break;
    }
    return jwt.sign(payload, secret, { expiresIn: "3d" });
  }

  public checkAdminActionToken(token: string, tokeType: EActionTokenType) {
    try {
      let secret = "";
      switch (tokeType) {
        case EActionTokenType.forgot:
          secret = configs.JWT_ADMIN_FORGOT_SECRET;
          break;
        case EActionTokenType.verify:
          secret = configs.JWT_ADMIN_VERIFY_SECRET;
          break;
      }
      return jwt.verify(token, secret) as IAdminActionTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
