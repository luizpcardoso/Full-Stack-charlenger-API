import { Request, Response, NextFunction } from "express";

const verifyUserFieldsMiddlewere = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const error = [];

    if (!username) {
      error.push("username is a required field");
    }
    if (!password) {
      error.push("password is a required field");
    }

    return res.status(400).json({ error: error });
  }
  if (username.length < 3) {
    return res
      .status(400)
      .json({ error: "username must contain three characters or more" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "password must be six characters or more" });
  }

  next();
};

export default verifyUserFieldsMiddlewere;
