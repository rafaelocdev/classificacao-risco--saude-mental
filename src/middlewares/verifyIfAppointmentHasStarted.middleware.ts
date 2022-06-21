import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../errors/errors";

const verifyIfAppointmentHasStarted = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const { appointment } = req;

  if (appointment.onDuty) {
    throw new ErrorHandler(409, "Appointment was already started.");
  }

  return next();
};

export default verifyIfAppointmentHasStarted;
