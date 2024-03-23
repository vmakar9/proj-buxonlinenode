import { model, Schema, Types } from "mongoose";

import { Admin } from "./admin.model";

const adminTokenSchema = new Schema(
  {
    _admin_id: {
      type: Types.ObjectId,
      required: true,
      ref: Admin,
    },
    accessAdminToken: {
      type: String,
      required: true,
    },
    refreshAdminToken: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const AdminToken = model("Admin Token", adminTokenSchema);
