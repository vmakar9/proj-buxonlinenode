import { UploadedFile } from "express-fileupload";

import { ApiError } from "../erorr/api.error";
import { Company } from "../models/company.model";
import { CompanyToken } from "../models/company.token.model";
import { ICompany } from "../types/company.type";
import { ICompanyTokenPayload } from "../types/token.type";
import { s3Service } from "./s3.service";

class CompanyService {
  public async getMyCompany(
    jwtPayload: ICompanyTokenPayload,
  ): Promise<ICompany> {
    const company = await Company.findOne({ _id: jwtPayload._id });
    if (!company) {
      throw new ApiError("You cannot access this company", 403);
    }
    return company;
  }

  public async updateMyCompany(
    jwtPayload: ICompanyTokenPayload,
    body: Partial<ICompany>,
  ): Promise<ICompany> {
    const company = await Company.findOne({ _id: jwtPayload._id });
    if (!company) {
      throw new ApiError("Company not found", 404);
    }

    return Company.findByIdAndUpdate(jwtPayload._id, body, {
      returnDocument: "after",
    });
  }

  public async deleteMyCompany(
    jwtPayload: ICompanyTokenPayload,
  ): Promise<void> {
    const company = await Company.findOne({ _id: jwtPayload._id });
    if (!company) {
      throw new ApiError("Company not found", 404);
    }
    await Promise.all([
      Company.findByIdAndDelete({ _id: jwtPayload._id }),
      CompanyToken.deleteMany({ _company_id: jwtPayload._id }),
    ]);
  }

  public async uploadCompanyAvatar(
    file: UploadedFile,
    jwtPayload: ICompanyTokenPayload,
  ): Promise<ICompany> {
    try {
      const company = await Company.findOne({ _id: jwtPayload._id });
      if (company.avatar) {
        await s3Service.deleteCompanyAvatar(company.avatar);
      }
      const filePath = await s3Service.uploadCompanyAvatar(
        file,
        "company-avatar",
        jwtPayload._id,
      );

      return await Company.findByIdAndUpdate(
        jwtPayload._id,
        { avatar: filePath },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async deleteCompanyAvatar(
    jwtPayload: ICompanyTokenPayload,
  ): Promise<ICompany> {
    try {
      const company = await Company.findOne({ _id: jwtPayload._id });

      if (!company) {
        throw new ApiError("You cant get this candidate", 403);
      }
      if (!company.avatar) {
        throw new ApiError("Candidate doesnt have CV", 422);
      }

      await s3Service.deleteCompanyAvatar(company.avatar);

      return await Company.findByIdAndUpdate(
        jwtPayload._id,
        { $unset: { avatar: true } },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }
}

export const companyService = new CompanyService();
