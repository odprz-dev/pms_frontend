export interface User {
  pkIdUser: string;
  userName: string;
  email: string;
  passwordHash: string;
  timeStamp: Date;
  ctStatus: boolean;
  fkIdSexo: number;
  password: string;
}

export interface UserEdit{

  pkIdUser: string;
  userName: string;
  email: string;
  fkIdSexo: number;
  lastPassword: string;
  newPassword: string;
}


export interface UserLogin{
  usuario: string;
  password: string;
}
