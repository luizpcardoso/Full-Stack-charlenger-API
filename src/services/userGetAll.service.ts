import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

import { User } from "../entities/user.entity";

import { IUserCreate } from "../interfaces";

const userGetAllService = async (): Promise<IUserCreate[]> => {
  const userRepository: Repository<IUserCreate> =
    AppDataSource.getRepository(User);

  const users: IUserCreate[] = await userRepository.find();

  return users;
};

export default userGetAllService;
