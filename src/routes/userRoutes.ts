import { Router } from "express";
import { userCreateController } from "../controllers/users/userCreate.controller";
import { userLoginController } from "../controllers/users/userLoguin.controller";
import verifyUserFieldsMiddlewere from "../middlewares/verifyUserFields.middleware";

const routes = Router();

export const userRoutes: any = () => {
  routes.post("/user", verifyUserFieldsMiddlewere, userCreateController);
  routes.post("/login", userLoginController);
  return routes;
};
