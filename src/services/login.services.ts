import { compare } from "bcrypt";
import { Request } from "express";
import { Data, Employee } from "../entities";
import { ErrorHandler } from "../errors/errors";
import { dataRepo, employeeRepo } from "../repositories/";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

class LoginService {
  login = async ({ validated }: Request): Promise<string> => {
    const data = await dataRepo.findOneBy({
      email: (validated as Data).email,
    });

    if (!data) {
      throw new ErrorHandler(401, "Invalid credentials");
    }

    const employee = await employeeRepo.findOneBy({
      data: { id: data.id },
    });

    if (!(await compare((validated as Employee).password, employee.password))) {
      throw new ErrorHandler(401, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: employee.id, email: data.email },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    return token;
  };
}

export default new LoginService();
