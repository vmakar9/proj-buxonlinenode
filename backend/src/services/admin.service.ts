import { ApiError } from "../erorr/api.error";
import { Admin } from "../models/admin.model";
import { AdminToken } from "../models/admin.token.model";
import { IAdmin } from "../types/admin.type";
import { IAdminTokenPayload } from "../types/token.type";

class AdminService {
  public async getMe(jwtPayload: IAdminTokenPayload): Promise<IAdmin> {
    const admin = await Admin.findOne({ _id: jwtPayload._id });
    if (!admin) {
      throw new ApiError("You cant get this admin", 403);
    }
    return admin;
  }

  public async updateMe(
    jwtPayload: IAdminTokenPayload,
    body: Partial<IAdmin>,
  ): Promise<IAdmin> {
    const admin = await Admin.findOne({ _id: jwtPayload._id });
    if (!admin) {
      throw new ApiError("Admin not found", 404);
    }
    return Admin.findByIdAndUpdate(jwtPayload._id, body, {
      returnDocument: "after",
    });
  }

  public async deleteMe(jwtPayload: IAdminTokenPayload): Promise<void> {
    const admin = await Admin.findOne({ _id: jwtPayload._id });
    if (!admin) {
      throw new ApiError("Admin not found", 404);
    }
    await Promise.all([
      Admin.findByIdAndDelete({ _id: jwtPayload._id }),
      AdminToken.deleteMany({ _userId: jwtPayload._id }),
    ]);
  }
}

export const adminService = new AdminService();
