export interface ICandidateCredentials {
  email: string;
  password: string;
}

export interface IHRCredentials {
  email: string;
  password: string;
}

export interface ICompanyCredentials {
  cooperative_email: string;
  password: string;
}

export interface IAdminCredentials {
  email: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
