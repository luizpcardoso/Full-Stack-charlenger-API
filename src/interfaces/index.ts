import { EphemeralKeyInfo } from "tls";
import { Transaction } from "../entities/transactions.entity";
import { User } from "../entities/user.entity";

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

export interface IUserCreateResponse {
  username: string;
}

export interface ITransactionSend {
  message: string;
}

export interface ITransactionRead {
  cashIn?: Transaction[];
  cashOut?: Transaction[];
}

export interface IAccount {
  account_id: string;
  balance: number;
  user?: User;
  transactionsDebit?: Transaction[];
  transactionsCredit?: Transaction[];
}

export interface IBalanceRead {
  balance: number;
}
