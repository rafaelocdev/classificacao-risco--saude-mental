import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errors";

const validateIsAdmin = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (req.decoded.job !== "Administrador(a)") {
    throw new ErrorHandler(401, "Permission denied.");
  }

  return next();
};

export default validateIsAdmin;
