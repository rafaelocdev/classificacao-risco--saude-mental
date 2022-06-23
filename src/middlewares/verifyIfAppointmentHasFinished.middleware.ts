import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../errors/errors";

const verifyIfAppointmentHasFinished = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const { appointment } = req;

  if (appointment.anamnesis) {
    throw new ErrorHandler(409, "Appointment was already finished.");
  }

  return next();
};

export default verifyIfAppointmentHasFinished;
