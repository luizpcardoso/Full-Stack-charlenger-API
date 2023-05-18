import {
  IUser,
  IUserCreateResponse,
  IUserCreate,
  IAccount,
} from "../interfaces";
import { User } from "../entities/user.entity";
import { Account } from "../entities/accounts.entity";
import { AppError } from "../errors/appErrors";

import { AppDataSource } from "../data-source";

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { Repository } from "typeorm";

export const userCreateService = async ({
  username,
  email,
  password,
}: IUserCreate): Promise<IUserCreateResponse> => {
  const userRepository: Repository<IUser> = AppDataSource.getRepository(User);
  const accountRepository: Repository<IAccount> =
    AppDataSource.getRepository(Account);
  const users: IUser[] = await userRepository.find();

  const userAlreadyExist: IUser | undefined = users.find(
    (user) => user.email === email || user.username === username
  );

  if (userAlreadyExist) {
    throw new AppError(409, "This username or email already exists");
  }

  const newAccount: IAccount = {
    account_id: uuidv4(),
    balance: 100,
  };

  const newUser: IUser = {
    user_id: uuidv4(),
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 10),
    account: newAccount,
  };
  accountRepository.create(newAccount);
  await accountRepository.save(newAccount);

  userRepository.create(newUser);
  await userRepository.save(newUser);

  return {
    username: newUser.username,
  };
};
