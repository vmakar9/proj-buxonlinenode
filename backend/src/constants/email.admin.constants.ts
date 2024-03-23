import { EEmailAdminEnum } from "../enum/email-admin.enum";

export const allAdminTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailAdminEnum.FORGOT_ADMIN_PASSWORD]: {
    subject: "Restore password",
    templateName: "forgot_password_admin",
  },
  [EEmailAdminEnum.WELCOME]: {
    subject: "Welcome Admin",
    templateName: "welcome_admin",
  },
};
