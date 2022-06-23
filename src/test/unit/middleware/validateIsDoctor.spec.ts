import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { ErrorHandler } from "../../../errors/errors";
import { validateIsDoctor } from "../../../middlewares";

describe("Validate is Doctor - Middleware | Unit tests", () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {};
  const mockNext: NextFunction = jest.fn();

  it("Should error when employee that not doctor try start a appointment", () => {
    mockReq.decoded = { job: "Enfermeiro(a)" };

    try {
      validateIsDoctor(mockReq as Request, mockRes as Response, mockNext);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe(
        "Only doctors are allowed to access this route.",
      );
      expect(error.statusCode).toBe(401);
    }
  });

  it("Should by pass middleware when a doctor try start a appointment", () => {
    mockReq.decoded = { job: "Médico(a)" };

    try {
      validateIsDoctor(mockReq as Request, mockRes as Response, mockNext);
    } catch (error) {
      expect(mockNext).toBeCalledTimes(1);
    }
  });
});
