import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { Appointment, Employee, OnDuty } from "../../../entities";
import { ErrorHandler } from "../../../errors/errors";
import { verifyIfAppointmentHasStarted } from "../../../middlewares";

describe("Verify if appointment already has finished - Middleware | Unit tests", () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {};
  const mockNext: NextFunction = jest.fn();
  const mockAppointment = new Appointment();

  it("Should error when appointment already has started", () => {
    const mockEmployee = new Employee();
    const mockOnDuty = new OnDuty();

    mockOnDuty.employee = mockEmployee;
    mockAppointment.onDuty = mockOnDuty;

    mockReq.appointment = mockAppointment;

    try {
      verifyIfAppointmentHasStarted(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe("Appointment was already started.");
      expect(error.statusCode).toBe(409);
    }
  });

  it("Should by pass middleware when appointment has not started", () => {
    mockAppointment.onDuty = null;
    mockReq.appointment = mockAppointment;

    try {
      verifyIfAppointmentHasStarted(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );
    } catch (error) {
      expect(mockNext).toBeCalledTimes(1);
    }
  });
});
