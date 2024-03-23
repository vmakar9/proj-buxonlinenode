import { Document } from "mongoose";
export interface ICandidate extends Document {
  name?: string;
  surname?: string;
  email: string;
  status: string;
  CV?: string;
  avatar?: string;
  password: string;
}
