import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appErrors";

export const verifyAuthUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(401, "Token required");
    }

    if (token != undefined) {
      jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
        (error: any, decoded: any) => {
          if (error) {
            throw new AppError(401, "Ivalid token");
          }

          req.username = decoded.username;
        }
      );
    }

    next();
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).send(err);
    }
  }
};

export default verifyAuthUserMiddleware;
