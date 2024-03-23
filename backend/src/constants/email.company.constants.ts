import { EEmailCompanyEnum } from "../enum/email-company.enum";

export const allCompanyTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailCompanyEnum.FORGOT_COMPANY_PASSWORD]: {
    subject: "Restore password",
    templateName: "forgot_password_company",
  },
  [EEmailCompanyEnum.WELCOME]: {
    subject: "Welcome Company",
    templateName: "welcome_company",
  },
};
