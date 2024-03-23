import { EEmailHREnum } from "../enum/email-hr.enum";

export const allHRTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailHREnum.FORGOT_HR_PASSWORD]: {
    subject: "Restore password",
    templateName: "forgot_password_hr",
  },
  [EEmailHREnum.WELCOME]: {
    subject: "Welcome HR",
    templateName: "welcome_hr",
  },
};
