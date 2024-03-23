import { EAccountStatusEnum } from "../enum/account-status.enum";
import { EActionTokenType } from "../enum/action-token-type.enum";
import { EEmailAdminEnum } from "../enum/email-admin.enum";
import { EEmailCandidateEnum } from "../enum/email-candiate.enum";
import { EEmailCompanyEnum } from "../enum/email-company.enum";
import { EEmailHREnum } from "../enum/email-hr.enum";
import { ApiError } from "../erorr/api.error";
import { ActionAdminToken } from "../models/action.token.admin.model";
import { ActionCandidateToken } from "../models/action.token.candidate.model";
import { ActionCompanyToken } from "../models/action.token.company.model";
import { ActionHRToken } from "../models/action.token.hr.model";
import { Admin } from "../models/admin.model";
import { AdminToken } from "../models/admin.token.model";
import { Candidate } from "../models/candidate.model";
import { CandidateToken } from "../models/candidate.token.model";
import { Company } from "../models/company.model";
import { CompanyToken } from "../models/company.token.model";
import { HR } from "../models/hr.model";
import { HRToken } from "../models/hr.token.model";
import { IAdmin } from "../types/admin.type";
import {
  IAdminCredentials,
  ICandidateCredentials,
  IChangePassword,
  ICompanyCredentials,
  IHRCredentials,
} from "../types/auth.type";
import { ICandidate } from "../types/candidate.type";
import { ICompany } from "../types/company.type";
import { IHR } from "../types/hr.type";
import {
  IAdminTokenPair,
  IAdminTokenPayload,
  ICandidateTokenPair,
  ICandidateTokenPayload,
  ICompanyTokenPair,
  ICompanyTokenPayload,
  IHRTokenPair,
  IHRTokenPayload,
} from "../types/token.type";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async candidateRegister(body: ICandidate): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      const candidate = await Candidate.create({
        ...body,
        password: hashedPassword,
      });

      const actionToken = tokenService.generateCandidateActionToken(
        { _id: candidate._id },
        EActionTokenType.verify,
      );

      await Promise.all([
        ActionCandidateToken.create({
          actionToken,
          _candidate_id: candidate._id,
          tokenType: EActionTokenType.verify,
        }),
        emailService.sendCandidateEmail(
          body.email,
          EEmailCandidateEnum.WELCOME,
          {
            name: body.name,
            actionToken,
          },
        ),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async candidateLogin(
    credentials: ICandidateCredentials,
    candidate: ICandidate,
  ): Promise<ICandidateTokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        candidate.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 409);
      }

      const tokenPair = tokenService.generateCandidateToken({
        _id: candidate._id,
      });

      await CandidateToken.create({
        _candidate_id: candidate._id,
        ...tokenPair,
      });
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async hrRegister(body: IHR): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      const hr = await HR.create({ ...body, password: hashedPassword });

      const actionToken = tokenService.generateHRActionToken(
        { _id: hr._id },
        EActionTokenType.verify,
      );
      await Promise.all([
        ActionHRToken.create({
          actionToken,
          _hr_id: hr._id,
          tokenType: EActionTokenType.verify,
        }),
        emailService.sendHREmail(hr.email, EEmailHREnum.WELCOME, {
          name: body.name,
          actionToken,
        }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async hrLogin(
    credentials: IHRCredentials,
    hr: IHR,
  ): Promise<IHRTokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        hr.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 409);
      }

      const tokenPair = tokenService.generateHRToken({
        _id: hr._id,
      });

      await HRToken.create({
        _hr_id: hr._id,
        ...tokenPair,
      });
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async companyRegister(body: ICompany): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      const company = await Company.create({
        ...body,
        password: hashedPassword,
      });

      const actionToken = tokenService.generateCompanyActionToken(
        { _id: company._id },
        EActionTokenType.verify,
      );

      await Promise.all([
        ActionCompanyToken.create({
          actionToken,
          _company_id: company._id,
          tokenType: EActionTokenType.verify,
        }),
        emailService.sendCompanyEmail(
          body.cooperative_email,
          EEmailCompanyEnum.WELCOME,
          {
            name: body.name,
            actionToken,
          },
        ),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async companyLogin(
    credentials: ICompanyCredentials,
    company: ICompany,
  ): Promise<ICompanyTokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        company.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 409);
      }

      const tokenPair = tokenService.generateCompanyToken({
        _id: company._id,
      });

      await CompanyToken.create({
        _company_id: company._id,
        ...tokenPair,
      });
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async refreshCandidate(
    tokenInfo: ICandidateTokenPair,
    jwtPayload: ICandidateTokenPayload,
  ): Promise<ICandidateTokenPair> {
    try {
      const tokenPair = tokenService.generateCandidateToken({
        _id: jwtPayload._id,
      });
      await Promise.all([
        CandidateToken.create({ _candidate_id: jwtPayload._id, ...tokenPair }),
        CandidateToken.deleteOne({
          refreshCandidateToken: tokenInfo.refreshCandidateToken,
        }),
      ]);
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refreshHR(
    tokenInfo: IHRTokenPair,
    jwtPayload: IHRTokenPayload,
  ): Promise<IHRTokenPair> {
    try {
      const tokenPair = tokenService.generateHRToken({
        _id: jwtPayload._id,
      });
      await Promise.all([
        HRToken.create({ _hr_id: jwtPayload._id, ...tokenPair }),
        HRToken.deleteOne({
          refreshHRToken: tokenInfo.refreshHRToken,
        }),
      ]);
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refreshCompany(
    tokenInfo: ICompanyTokenPair,
    jwtPayload: ICompanyTokenPayload,
  ): Promise<ICompanyTokenPair> {
    try {
      const tokenPair = tokenService.generateCompanyToken({
        _id: jwtPayload._id,
      });
      await Promise.all([
        CompanyToken.create({ _company_id: jwtPayload._id, ...tokenPair }),
        CompanyToken.deleteOne({
          refreshCompanyToken: tokenInfo.refreshCompanyToken,
        }),
      ]);
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changeCandidatePassword(
    data: IChangePassword,
    jwtPayload: ICandidateTokenPayload,
  ): Promise<void> {
    try {
      const candidate = await Candidate.findOne({ _id: jwtPayload._id });
      if (!candidate) {
        throw new ApiError("Candidate not found", 404);
      }

      const isMatch = await passwordService.compare(
        data.oldPassword,
        candidate.password,
      );
      if (!isMatch) {
        throw new ApiError("Old password is invalid", 400);
      }

      const hashedNewCandidatePassword = await passwordService.hash(
        data.newPassword,
      );

      await Candidate.findByIdAndUpdate(
        candidate._id,
        { password: hashedNewCandidatePassword },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changeHRPassword(
    data: IChangePassword,
    jwtPayload: IHRTokenPayload,
  ): Promise<void> {
    try {
      const hr = await HR.findOne({ _id: jwtPayload._id });
      if (!hr) {
        throw new ApiError("HR not found", 404);
      }

      const isMatch = await passwordService.compare(
        data.oldPassword,
        hr.password,
      );
      if (!isMatch) {
        throw new ApiError("Old password is invalid", 400);
      }

      const hashedNewHRPassword = await passwordService.hash(data.newPassword);

      await HR.findByIdAndUpdate(
        hr._id,
        { password: hashedNewHRPassword },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changeCompanyPassword(
    data: IChangePassword,
    jwtPayload: ICompanyTokenPayload,
  ): Promise<void> {
    try {
      const company = await Company.findOne({ _id: jwtPayload._id });
      if (!company) {
        throw new ApiError("Company not found", 404);
      }

      const isMatch = await passwordService.compare(
        data.oldPassword,
        company.password,
      );
      if (!isMatch) {
        throw new ApiError("Old password is invalid", 400);
      }

      const hashedNewCompanyPassword = await passwordService.hash(
        data.newPassword,
      );

      await Company.findByIdAndUpdate(
        company._id,
        { password: hashedNewCompanyPassword },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotCandidatePassword(candidate: ICandidate): Promise<void> {
    try {
      const actionToken = tokenService.generateCandidateActionToken(
        { _id: candidate._id },
        EActionTokenType.forgot,
      );

      await ActionCandidateToken.create({
        _candidate_id: candidate._id,
        tokenType: EActionTokenType.forgot,
        actionToken,
      });

      await emailService.sendCandidateEmail(
        candidate.email,
        EEmailCandidateEnum.FORGOT_PASSWORD,
        {
          token: actionToken,
        },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotCandidatePassword(
    password: string,
    actionToken: string,
  ) {
    try {
      const payload = tokenService.checkCandidateActionToken(
        actionToken,
        EActionTokenType.forgot,
      );
      const entity = await ActionCandidateToken.findOne({ actionToken });
      if (!entity) {
        throw new ApiError("Not valid token", 400);
      }
      const newHashedPassword = await passwordService.hash(password);
      await Promise.all([
        Candidate.findByIdAndUpdate(payload._id, {
          password: newHashedPassword,
        }),
        ActionCandidateToken.deleteOne({ actionToken }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotHRPassword(hr: IHR): Promise<void> {
    try {
      const actionToken = tokenService.generateHRActionToken(
        { _id: hr._id },
        EActionTokenType.forgot,
      );

      await ActionHRToken.create({
        _hr_id: hr._id,
        tokenType: EActionTokenType.forgot,
        actionToken,
      });

      await emailService.sendHREmail(
        hr.email,
        EEmailHREnum.FORGOT_HR_PASSWORD,
        {
          token: actionToken,
        },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotHRPassword(password: string, actionToken: string) {
    try {
      const payload = tokenService.checkHRActionToken(
        actionToken,
        EActionTokenType.forgot,
      );
      const entity = await ActionHRToken.findOne({ actionToken });
      if (!entity) {
        throw new ApiError("Not valid token", 400);
      }
      const newHashedPassword = await passwordService.hash(password);
      await Promise.all([
        HR.findByIdAndUpdate(payload._id, {
          password: newHashedPassword,
        }),
        ActionHRToken.deleteOne({ actionToken }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotCompanyPassword(company: ICompany): Promise<void> {
    try {
      const actionToken = tokenService.generateCompanyActionToken(
        { _id: company._id },
        EActionTokenType.forgot,
      );

      await ActionCompanyToken.create({
        _company_id: company._id,
        tokenType: EActionTokenType.forgot,
        actionToken,
      });

      await emailService.sendCompanyEmail(
        company.cooperative_email,
        EEmailCompanyEnum.FORGOT_COMPANY_PASSWORD,
        {
          token: actionToken,
        },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotCompanyPassword(password: string, actionToken: string) {
    try {
      const payload = tokenService.checkCompanyActionToken(
        actionToken,
        EActionTokenType.forgot,
      );
      const entity = await ActionCompanyToken.findOne({ actionToken });
      if (!entity) {
        throw new ApiError("Not valid token", 400);
      }
      const newHashedPassword = await passwordService.hash(password);
      await Promise.all([
        Company.findByIdAndUpdate(payload._id, {
          password: newHashedPassword,
        }),
        ActionCompanyToken.deleteOne({ actionToken }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async verifyCandidate(actionToken: string) {
    try {
      const payload = tokenService.checkCandidateActionToken(
        actionToken,
        EActionTokenType.verify,
      );
      const entity = await ActionCandidateToken.findOne({ actionToken });
      if (!entity) {
        throw new ApiError("Token not valid", 400);
      }
      await Promise.all([
        Candidate.findByIdAndUpdate(payload._id, {
          status: EAccountStatusEnum.verified,
        }),
        ActionCandidateToken.deleteOne({ actionToken }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async verifyHR(actionToken: string) {
    try {
      const payload = tokenService.checkHRActionToken(
        actionToken,
        EActionTokenType.verify,
      );
      const entity = await ActionHRToken.findOne({ actionToken });
      if (!entity) {
        throw new ApiError("Token not valid", 400);
      }
      await Promise.all([
        HR.findByIdAndUpdate(payload._id, {
          status: EAccountStatusEnum.verified,
        }),
        ActionHRToken.deleteOne({ actionToken }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async verifyCompany(actionToken: string) {
    try {
      const payload = tokenService.checkCompanyActionToken(
        actionToken,
        EActionTokenType.verify,
      );
      const entity = await ActionCompanyToken.findOne({ actionToken });
      if (!entity) {
        throw new ApiError("Token not valid", 400);
      }
      await Promise.all([
        Company.findByIdAndUpdate(payload._id, {
          status: EAccountStatusEnum.verified,
        }),
        ActionCompanyToken.deleteOne({ actionToken }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async adminRegister(body: IAdmin): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      const admin = await Admin.create({
        ...body,
        password: hashedPassword,
      });

      const actionToken = tokenService.generateAdminActionToken(
        { _id: admin._id },
        EActionTokenType.verify,
      );

      await Promise.all([
        ActionAdminToken.create({
          actionToken,
          _admin_id: admin._id,
          tokenType: EActionTokenType.verify,
        }),
        emailService.sendAdminEmail(body.email, EEmailAdminEnum.WELCOME, {
          name: body.name,
          actionToken,
        }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async adminLogin(
    credentials: IAdminCredentials,
    admin: IAdmin,
  ): Promise<IAdminTokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        admin.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 409);
      }

      const tokenPair = tokenService.generateAdminToken({
        _id: admin._id,
      });

      await AdminToken.create({
        _admin_id: admin._id,
        ...tokenPair,
      });
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async refreshAdmin(
    tokenInfo: IAdminTokenPair,
    jwtPayload: IAdminTokenPayload,
  ): Promise<IAdminTokenPair> {
    try {
      const tokenPair = tokenService.generateAdminToken({
        _id: jwtPayload._id,
      });
      await Promise.all([
        AdminToken.create({ _admin_id: jwtPayload._id, ...tokenPair }),
        AdminToken.deleteOne({
          refreshAdminToken: tokenInfo.refreshAdminToken,
        }),
      ]);
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changeAdminPassword(
    data: IChangePassword,
    jwtPayload: IAdminTokenPayload,
  ): Promise<void> {
    try {
      const admin = await Admin.findOne({ _id: jwtPayload._id });
      if (!admin) {
        throw new ApiError("Admin not found", 404);
      }

      const isMatch = await passwordService.compare(
        data.oldPassword,
        admin.password,
      );
      if (!isMatch) {
        throw new ApiError("Old password is invalid", 400);
      }

      const hashedNewAdminPassword = await passwordService.hash(
        data.newPassword,
      );

      await Admin.findByIdAndUpdate(
        admin._id,
        { password: hashedNewAdminPassword },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotAdminPassword(admin: IAdmin): Promise<void> {
    try {
      const actionToken = tokenService.generateAdminActionToken(
        { _id: admin._id },
        EActionTokenType.forgot,
      );

      await ActionAdminToken.create({
        _admin_id: admin._id,
        tokenType: EActionTokenType.forgot,
        actionToken,
      });

      await emailService.sendAdminEmail(
        admin.email,
        EEmailAdminEnum.FORGOT_ADMIN_PASSWORD,
        {
          token: actionToken,
        },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotAdminPassword(password: string, actionToken: string) {
    try {
      const payload = tokenService.checkAdminActionToken(
        actionToken,
        EActionTokenType.forgot,
      );
      const entity = await ActionAdminToken.findOne({ actionToken });
      if (!entity) {
        throw new ApiError("Not valid token", 400);
      }
      const newHashedPassword = await passwordService.hash(password);
      await Promise.all([
        Admin.findByIdAndUpdate(payload._id, {
          password: newHashedPassword,
        }),
        ActionAdminToken.deleteOne({ actionToken }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async verifyAdmin(actionToken: string) {
    try {
      const payload = tokenService.checkAdminActionToken(
        actionToken,
        EActionTokenType.verify,
      );
      const entity = await ActionAdminToken.findOne({ actionToken });
      if (!entity) {
        throw new ApiError("Token not valid", 400);
      }
      await Promise.all([
        Admin.findByIdAndUpdate(payload._id, {
          status: EAccountStatusEnum.verified,
        }),
        ActionAdminToken.deleteOne({ actionToken }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
