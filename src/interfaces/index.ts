import { EphemeralKeyInfo } from "tls";

export interface IUserCreate {
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  user_id: string;
  username: string;
  email: string;
  password: string;
  account: any;
}

export interface IUserLogin {
  email: string;
  password: string;
}
