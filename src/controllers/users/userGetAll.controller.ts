import { Request, Response } from "express";
import { AppError } from "../../errors/appErrors";
import userGetAllService from "../../services/userGetAll.service";

export const userGetAllController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await userGetAllService();

    return res.status(200).json(users);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).send(err);
    }
    return res.status(500).send("Internal Server Error");
  }
};
