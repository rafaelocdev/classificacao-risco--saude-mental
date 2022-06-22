import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { Employee } from "../entities";
import { ErrorHandler } from "../errors/errors";

const validateToken = (req: Request, _: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new ErrorHandler(400, "Jwt not found.");

  return jwt.verify(
    token,
    process.env.SECRET_KEY,
    (err: VerifyErrors, decoded: JwtPayload) => {
      if (err) throw new ErrorHandler(400, "Jwt expired");

      req.decoded = decoded as Partial<Employee>;

      next();
    }
  );
};

export default validateToken;
