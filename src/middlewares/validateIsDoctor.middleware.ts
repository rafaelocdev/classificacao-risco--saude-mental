import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errors";

const validateIsDoctor = (req: Request, _: Response, next: NextFunction) => {
  const { job } = req.decoded;

  if (job !== "Médico(a)") {
    throw new ErrorHandler(
      401,
      "Only doctors are allowed to access this route.",
    );
  }

  return next();
};

export default validateIsDoctor;
