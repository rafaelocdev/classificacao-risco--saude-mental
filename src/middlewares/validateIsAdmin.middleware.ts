import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errors";
import { employeeRepo } from "../repositories";

const validateIsAdmin = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const employee = await employeeRepo.findOneBy({ id: req.decoded.id });

  if (!employee) throw new ErrorHandler(400, "Employee not found.");

  if (employee.specialty !== "Admin")
    throw new ErrorHandler(
      403,
      "Only admins are allowed to access this route."
    );

  return next();
};

export default validateIsAdmin;
