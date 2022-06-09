import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./errors/errors";
import registerRoutes from "./routes";

const app = express();
app.use(express.json());
registerRoutes(app);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  return errorHandler(err, res);
});

export default app;
