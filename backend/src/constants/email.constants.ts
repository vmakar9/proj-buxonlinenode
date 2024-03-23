import { EEmailCandidateEnum } from "../enum/email-candiate.enum";

export const allCandidateTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailCandidateEnum.FORGOT_PASSWORD]: {
    subject: "Restore password",
    templateName: "forgot_password_candidate",
  },
  [EEmailCandidateEnum.WELCOME]: {
    subject: "Welcome candidate",
    templateName: "welcome_candidate",
  },
};
