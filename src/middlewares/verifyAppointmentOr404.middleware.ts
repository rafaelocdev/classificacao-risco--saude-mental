import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errors";
import { appointmentRepo } from "../repositories";
import { validate } from "uuid";

const verifyAppointmentOr404 = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (!validate(id)) {
    throw new ErrorHandler(400, "Invalid uuid.");
  }

  const foundAppointment = await appointmentRepo.listOne({ id: id });

  if (!foundAppointment) {
    throw new ErrorHandler(404, "Appointment not found.");
  }

  req.appointment = foundAppointment;

  return next();
};

export default verifyAppointmentOr404;
