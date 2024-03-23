import { Document, Types } from "mongoose";

import { ICompany } from "./company.type";

export interface IVacancy extends Document {
  title: string;
  salary: string;
  type_job: string;
  english_level: string;
  nature_of_work: string;
  description: string;
  requirements: string;
  social_packages: string;
  additional_information?: string;
  company: ICompany | Types.ObjectId;
}
