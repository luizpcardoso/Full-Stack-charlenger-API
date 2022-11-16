import { Router } from "express";

import { transactionOperation } from "../controllers/transactions/transactionOperations.controller";
import verifyAuthUserMiddleware from "../middlewares/verifyAuthUser.middleware";
import verifyTransactionFieldsMiddleware from "../middlewares/verifyTransactionFields.middleware";

const routes = Router();

export const transactionRoutes: any = () => {
  routes.post(
    "/pay",
    verifyAuthUserMiddleware,
    verifyTransactionFieldsMiddleware,
    transactionOperation
  );

  return routes;
};
