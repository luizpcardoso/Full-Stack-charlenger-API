import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appErrors";

const verifyUserCreateFieldsMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !password || !email) {
      const error = [];

      if (!username) {
        error.push("username is a required field");
      }
      if (!password) {
        error.push("password is a required field");
      }
      if (!email) {
        error.push("email is a required field");
      }

      throw new AppError(400, error.join(" - "));
    }
    if (username.length < 3) {
      throw new AppError(400, "username must contain three characters or more");
    }

    const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8,15}$/;

    if (!regex.test(password)) {
      throw new AppError(400, "password must be eight characters or more");
    }

    next();
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).send(err);
    }
  }
};

export default verifyUserCreateFieldsMiddlewere;
