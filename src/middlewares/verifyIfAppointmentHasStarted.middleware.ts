import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../errors/errors";

const verifyIfAppointmentHasStarted = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const { appointment } = req;

  const appointmentIsStarted = appointment.onDuty !== null;

  if (appointmentIsStarted) {
    throw new ErrorHandler(409, "Appointment was already started.");
  }

  return next();
};

export default verifyIfAppointmentHasStarted;
