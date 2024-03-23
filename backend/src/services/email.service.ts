import EmailTemplated from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import * as path from "path";

import { configs } from "../configs/configs";
import { allAdminTemplates } from "../constants/email.admin.constants";
import { allCompanyTemplates } from "../constants/email.company.constants";
import { allCandidateTemplates } from "../constants/email.constants";
import { allHRTemplates } from "../constants/email.hr.constants";
import { EEmailAdminEnum } from "../enum/email-admin.enum";
import { EEmailCandidateEnum } from "../enum/email-candiate.enum";
import { EEmailCompanyEnum } from "../enum/email-company.enum";
import { EEmailHREnum } from "../enum/email-hr.enum";
import { ApiError } from "../erorr/api.error";

class EmailService {
  private transporter: Transporter;
  private templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });
    this.templateParser = new EmailTemplated({
      views: {
        root: path.join(process.cwd(), "src", "statics"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "src", "statics", "css"),
        },
      },
    });
  }

  public async sendCandidateEmail(
    email: string | string[],
    emailAction: EEmailCandidateEnum,
    locals: Record<string, string> = {},
  ) {
    try {
      const templateInfo = allCandidateTemplates[emailAction];
      locals.frontURL = configs.FRONT_URL;
      const html = await this.templateParser.render(
        templateInfo.templateName,
        locals,
      );
      return this.transporter.sendMail({
        from: "No reply",
        to: email,
        subject: templateInfo.subject,
        html,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async sendHREmail(
    email: string | string[],
    emailAction: EEmailHREnum,
    locals: Record<string, string> = {},
  ) {
    try {
      const templateInfo = allHRTemplates[emailAction];
      locals.frontURL = configs.FRONT_URL;
      const html = await this.templateParser.render(
        templateInfo.templateName,
        locals,
      );
      return this.transporter.sendMail({
        from: "No reply",
        to: email,
        subject: templateInfo.subject,
        html,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async sendCompanyEmail(
    cooperative_email: string | string[],
    emailAction: EEmailCompanyEnum,
    locals: Record<string, string> = {},
  ) {
    try {
      const templateInfo = allCompanyTemplates[emailAction];
      locals.frontURL = configs.FRONT_URL;
      const html = await this.templateParser.render(
        templateInfo.templateName,
        locals,
      );
      return this.transporter.sendMail({
        from: "No reply",
        to: cooperative_email,
        subject: templateInfo.subject,
        html,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async sendAdminEmail(
    email: string | string[],
    emailAction: EEmailAdminEnum,
    locals: Record<string, string> = {},
  ) {
    try {
      const templateInfo = allAdminTemplates[emailAction];
      locals.frontURL = configs.FRONT_URL;
      const html = await this.templateParser.render(
        templateInfo.templateName,
        locals,
      );
      return this.transporter.sendMail({
        from: "No reply",
        to: email,
        subject: templateInfo.subject,
        html,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const emailService = new EmailService();
