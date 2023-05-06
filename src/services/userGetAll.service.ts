import { AppDataSource } from "../data-source";

import { User } from "../entities/user.entity";

import { AppError } from "../errors/appErrors";

const userGetAllService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users;
};

export default userGetAllService;
