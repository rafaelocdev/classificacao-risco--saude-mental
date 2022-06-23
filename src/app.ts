import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./errors/errors";
import registerRoutes from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
registerRoutes(app);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  return errorHandler(err, res);
});

export default app;
