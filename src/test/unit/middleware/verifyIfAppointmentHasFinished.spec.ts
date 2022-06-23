import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { Appointment } from "../../../entities";
import { ErrorHandler } from "../../../errors/errors";
import {
  validateIsDoctor,
  verifyIfAppointmentHasFinished,
} from "../../../middlewares";

describe("Verify if appointment already has finished - Middleware | Unit tests", () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {};
  const mockNext: NextFunction = jest.fn();

  it("Should error when appointment already has finished", () => {
    const mockAppointment = new Appointment();
    mockAppointment.anamnesis = "lasdasdasdasdasda";
    mockReq.appointment = mockAppointment;

    try {
      verifyIfAppointmentHasFinished(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe("Appointment was already finished.");
      expect(error.statusCode).toBe(409);
    }
  });

  it("Should by pass middleware when appointment has not finished", () => {
    const mockAppointment = new Appointment();
    mockAppointment.anamnesis = null;
    mockReq.appointment = mockAppointment;

    try {
      verifyIfAppointmentHasFinished(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );
    } catch (error) {
      expect(mockNext).toBeCalledTimes(1);
    }
  });
});
