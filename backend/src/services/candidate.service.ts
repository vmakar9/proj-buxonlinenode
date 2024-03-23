import { UploadedFile } from "express-fileupload";

import { ApiError } from "../erorr/api.error";
import { Candidate } from "../models/candidate.model";
import { CandidateToken } from "../models/candidate.token.model";
import { ICandidate } from "../types/candidate.type";
import { ICandidateTokenPayload } from "../types/token.type";
import { s3Service } from "./s3.service";

class CandidateService {
  public async getMe(jwtPayload: ICandidateTokenPayload): Promise<ICandidate> {
    const candidate = await Candidate.findOne({ _id: jwtPayload._id });
    if (!candidate) {
      throw new ApiError("You cant get this candidate", 403);
    }
    return candidate;
  }

  public async updateMe(
    jwtPayload: ICandidateTokenPayload,
    body: Partial<ICandidate>,
  ): Promise<ICandidate> {
    const candidate = await Candidate.findOne({ _id: jwtPayload._id });
    if (!candidate) {
      throw new ApiError("You cant get this candidate", 403);
    }
    return Candidate.findByIdAndUpdate(jwtPayload._id, body, {
      returnDocument: "after",
    });
  }

  public async deleteMe(jwtPayload: ICandidateTokenPayload): Promise<void> {
    const candidate = await Candidate.findOne({ _id: jwtPayload._id });
    if (!candidate) {
      throw new ApiError("You cant get this candidate", 403);
    }
    await Promise.all([
      Candidate.findByIdAndDelete({ _id: jwtPayload._id }),
      CandidateToken.deleteMany({ _candidate_id: jwtPayload._id }),
    ]);
  }

  public async uploadCV(
    file: UploadedFile,
    jwtPayload: ICandidateTokenPayload,
  ): Promise<ICandidate> {
    try {
      const candidate = await Candidate.findOne({ _id: jwtPayload._id });
      if (candidate.CV) {
        await s3Service.deleteCV(candidate.CV);
      }
      const filePath = await s3Service.uploadCV(
        file,
        "candidate",
        jwtPayload._id,
      );

      return await Candidate.findByIdAndUpdate(
        { _id: jwtPayload._id },
        { CV: filePath },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async deleteCV(
    jwtPayload: ICandidateTokenPayload,
  ): Promise<ICandidate> {
    try {
      const candidate = await Candidate.findOne({ _id: jwtPayload._id });

      if (!candidate) {
        throw new ApiError("You cant get this candidate", 403);
      }
      if (!candidate.CV) {
        throw new ApiError("Candidate doesnt have CV", 422);
      }

      await s3Service.deleteCV(candidate.CV);

      return await Candidate.findByIdAndUpdate(
        jwtPayload._id,
        { $unset: { CV: true } },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async uploadCandidateAvatar(
    file: UploadedFile,
    jwtPayload: ICandidateTokenPayload,
  ): Promise<ICandidate> {
    try {
      const candidate = await Candidate.findOne({ _id: jwtPayload._id });
      if (candidate.avatar) {
        await s3Service.deleteCandidateAvatar(candidate.avatar);
      }
      const filePath = await s3Service.uploadCandidateAvatar(
        file,
        "candidate-avatar",
        jwtPayload._id,
      );

      return await Candidate.findByIdAndUpdate(
        jwtPayload._id,
        { avatar: filePath },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async deleteCandidateAvatar(
    jwtPayload: ICandidateTokenPayload,
  ): Promise<ICandidate> {
    try {
      const candidate = await Candidate.findOne({ _id: jwtPayload._id });

      if (!candidate) {
        throw new ApiError("You cant get this candidate", 403);
      }
      if (!candidate.avatar) {
        throw new ApiError("Candidate doesnt have CV", 422);
      }

      await s3Service.deleteCandidateAvatar(candidate.avatar);

      return await Candidate.findByIdAndUpdate(
        jwtPayload._id,
        { $unset: { avatar: true } },
        { returnDocument: "after" },
      );
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }
}

export const candidateService = new CandidateService();
