import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

import { User } from "../entities/user.entity";

import { AppError } from "../errors/appErrors";

import { IBalanceRead, IUser } from "../interfaces";

const userBalanceReadService = async (
  username: string
): Promise<IBalanceRead> => {
  const userRepository: Repository<IUser> = AppDataSource.getRepository(User);

  const users: IUser[] = await userRepository.find();

  const user: IUser | undefined = users.find(
    (user) => user.username == username
  );

  if (!user) {
    throw new AppError(404, "user not found");
  }

  return { balance: user?.account.balance };
};

export default userBalanceReadService;
