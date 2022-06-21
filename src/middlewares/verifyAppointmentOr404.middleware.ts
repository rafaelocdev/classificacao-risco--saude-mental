import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errors";
import { appointmentRepo } from "../repositories";

const verifyAppointmentOr404 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const foundAppointment = await appointmentRepo.listOne({id: id});

  if (!foundAppointment) {
    throw new ErrorHandler(404, "Appointment not found.");
  }

  req.appointment = foundAppointment;

  return next();
};

export default verifyAppointmentOr404;