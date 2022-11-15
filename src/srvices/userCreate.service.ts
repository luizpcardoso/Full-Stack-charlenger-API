import { IUserCreate } from "../interfaces";
import { IUser } from "../interfaces";
import { User } from "../entities/user.entity";
import { Account } from "../entities/accounts.entity";
import { AppError } from "../errors/appErrors";

import { AppDataSource } from "../data-source";

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const userCreateService = async ({
  userName,
  password,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const accountRepository = AppDataSource.getRepository(Account);

  const userAlreadyExist = await userRepository.findOne({
    where: { userName },
  });

  if (userAlreadyExist) {
    throw new AppError(409, "This user already exists");
  }

  const newAccount = new Account();

  const newUser: IUser = {
    user_id: uuidv4(),
    userName: userName,
    password: bcrypt.hashSync(password, 10),
  };
  userRepository.create(newUser);
  await userRepository.save(newUser);
  return newUser;
};
