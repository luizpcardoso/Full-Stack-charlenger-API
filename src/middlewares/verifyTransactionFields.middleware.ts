import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appErrors";

const verifyTransactionFieldsMiddleware = async (
  req: Request,
  res: Response<AppError>,
  next: NextFunction
) => {
  const { username, value } = req.body;

  try {
    if (!username || !value) {
      const error = [];

      if (!username) {
        error.push("username is a required field");
      }
      if (!value) {
        error.push("value is a required field");
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

export default verifyTransactionFieldsMiddleware;
