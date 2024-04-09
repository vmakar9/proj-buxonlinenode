import bcrypt from "bcrypt";

import { configs } from "../configs/configs";
import { ApiError } from "../erorr/api.error";

class PasswordService {
  public async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, configs.SALT);
    } catch (e) {
      throw new ApiError("Failed to hash password", 422);
    }
  }

  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new ApiError("Failed to compare passwords", 401);
    }
  }
}

export const passwordService = new PasswordService();
