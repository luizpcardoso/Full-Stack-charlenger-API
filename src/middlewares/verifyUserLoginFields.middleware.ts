import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appErrors";

export const verifyUserLoginFieldsMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      const error = [];

      if (!email) {
        error.push("email is a required field");
      }
      if (!password) {
        error.push("password is a required field");
      }

      throw new AppError(400, error.join(" - "));
    }

    next();
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).send(err);
    }
  }
};

export default verifyUserLoginFieldsMiddlewere;
