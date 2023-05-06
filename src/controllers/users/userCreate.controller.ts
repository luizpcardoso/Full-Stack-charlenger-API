import { Request, Response } from "express";
import { AppError } from "../../errors/appErrors";

import { userCreateService } from "../../services/userCreate.service";

export const userCreateController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userCreateService({ username, email, password });
    return res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).send(err);
    }
  }
};
