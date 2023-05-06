import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appErrors";
import { IUserCreate, IUserLogin } from "../interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new AppError(404, "Account not found");
  }
  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    throw new AppError(401, "Wrong email/password");
  }

  const token = jwt.sign(
    { username: user.username },
    String(process.env.JWT_SECRET),
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export default userLoginService;
