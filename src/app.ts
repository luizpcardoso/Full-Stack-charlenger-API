import express from "express";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors/appErrors";
import { appRoutes } from "./routes";

const app = express();
app.use(express.json());
appRoutes(app);

app.listen(process.env.PORT || 3000);
