export interface User {
  PkIdUser: string;
  UserName: string;
  Email: string;
  PasswordHash: string;
  TimeStamp: Date;
  CtStatus: boolean;
  FkIdSexo: number;
  Password: string;
}

export interface UserEdit{

  PkIdUser: string;
  UserName: string;
  Email: string;
  FkIdSexo: number;
  LastPassword: string;
  NewPassword: string;
}
