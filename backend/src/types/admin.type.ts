import { Document } from "mongoose";

export interface IAdmin extends Document {
  name?: string;
  surname?: string;
  email: string;
  status: string;
  password: string;
}
