import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errors";
import clientRepository from "../repositories/client.repository";
import employeeRepository from "../repositories/employee.repository";

const verifyUserByIdOr404 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const userClient = await clientRepository.findOneBy({ id: id });

  const userEmployee = await employeeRepository.findOneBy({ id: id });

  if (!userClient && !userEmployee) {
    throw new ErrorHandler(404, "User not found.");
  }

  if (userClient) {
    req.user = userClient;
  } else {
    req.user = userEmployee;
  }

  return next();
};

export default verifyUserByIdOr404;
