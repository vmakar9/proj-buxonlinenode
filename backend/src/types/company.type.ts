import { Document } from "mongoose";
export interface ICompany extends Document {
  name: string;
  cooperative_email: string;
  specialization?: string;
  site_link?: string;
  foundation_date?: string;
  employees_qty?: number;
  projects_qty?: number;
  countries_qty?: number;
  world_offices?: string;
  main_office?: string;
  ukraine_offices?: string;
  interview_stages?: string;
  social_packages?: string;
  about_company?: string;
  avatar?: string;
  status: string;
  password: string;
}
