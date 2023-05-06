import { IUserCreate } from "../interfaces";
import { IUser } from "../interfaces";
import { User } from "../entities/user.entity";
import { Account } from "../entities/accounts.entity";
import { AppError } from "../errors/appErrors";

import { AppDataSource } from "../data-source";

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const userCreateService = async ({
  username,
  email,
  password,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const accountRepository = AppDataSource.getRepository(Account);
  const users = await userRepository.find();

  const userAlreadyExist = users.find(
    (user) => user.email === email || user.username === username
  );

  if (userAlreadyExist) {
    throw new AppError(409, "This username or email already exists");
  }

  const newAccount = {
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
