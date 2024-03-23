import { Types } from "mongoose";

import { ApiError } from "../erorr/api.error";
import { Vacancy } from "../models/vacancy.model";
import { IVacancy } from "../types/vacancy.type";

class VacancyService {
  public async publishVacancy(data: IVacancy, companyId: string) {
    try {
      await Vacancy.create({
        ...data,
        company: new Types.ObjectId(companyId),
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getAll(): Promise<IVacancy[]> {
    try {
      return Vacancy.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getVacancyById(vacancyId: string): Promise<IVacancy> {
    try {
      return await Vacancy.findById(vacancyId);
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async updateVacancyById(
    vacancyId: string,
    data: Partial<IVacancy>,
  ): Promise<IVacancy> {
    try {
      return await Vacancy.findByIdAndUpdate(vacancyId, data, {
        returnDocument: "after",
      });
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }

  public async deleteVacancyById(vacancyId: string): Promise<void> {
    try {
      await Vacancy.findByIdAndDelete(vacancyId);
    } catch (e) {
      throw new ApiError(e.error, e.message);
    }
  }
}

export const vacancyService = new VacancyService();
