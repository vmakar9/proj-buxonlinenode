import { UploadedFile } from "express-fileupload";

import { ApiError } from "../erorr/api.error";
import { HR } from "../models/hr.model";
import { HRToken } from "../models/hr.token.model";
import { IHR } from "../types/hr.type";
import { IHRTokenPayload } from "../types/token.type";
import { s3Service } from "./s3.service";

class HrService {
  public async getMe(jwtPayload: IHRTokenPayload): Promise<IHR> {
    const hr = await HR.findOne({ _id: jwtPayload._id });
    console.log(jwtPayload._id);
    if (!hr) {
      throw new ApiError("You cannot have this hr", 403);
    }
    return hr;
  }

  public async updateMe(
    jwtPayload: IHRTokenPayload,
    body: Partial<IHR>,
  ): Promise<IHR> {
    const hr = await HR.findOne({ _id: jwtPayload._id });
    if (!hr) {
      throw new ApiError("HR not found", 403);
    }
    return HR.findByIdAndUpdate(jwtPayload._id, body, {
      returnDocument: "after",
    });
  }

  public async deleteMe(jwtPayload: IHRTokenPayload): Promise<void> {
    const hr = await HR.findOne({ _id: jwtPayload._id });
    if (!hr) {
      throw new ApiError("Hr not found", 403);
    }
    await Promise.all([
      HR.findByIdAndDelete({ _id: jwtPayload._id }),
      HRToken.deleteMany({ _hr_id: jwtPayload._id }),
    ]);
  }

  public async uploadHRAvatar(
    file: UploadedFile,
    jwtPayload: IHRTokenPayload,
  ): Promise<IHR> {
    try {
      const hr = await HR.findOne({ _id: jwtPayload._id });
      if (hr.avatar) {
        await s3Service.deleteHRAvatar(hr.avatar);
      }
      const filePath = await s3Service.uploadHRAvatar(
        file,
        "hr-avatar",
        jwtPayload._id,
      );

      return await HR.findByIdAndUpdate(
        jwtPayload._id,
        { avatar: filePath },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async deleteHRAvatar(jwtPayload: IHRTokenPayload): Promise<IHR> {
    try {
      const hr = await HR.findOne({ _id: jwtPayload._id });

      if (!hr) {
        throw new ApiError("You cant get this candidate", 403);
      }
      if (!hr.avatar) {
        throw new ApiError("Candidate doesnt have CV", 422);
      }

      await s3Service.deleteHRAvatar(hr.avatar);

      return await HR.findByIdAndUpdate(
        jwtPayload._id,
        { $unset: { avatar: true } },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }
}

export const hrService = new HrService();
