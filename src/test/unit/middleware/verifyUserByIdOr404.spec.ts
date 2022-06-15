import { NextFunction, Request, Response } from "express";
import { ErrorHandler, errorHandler } from "../../../errors/errors";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import { verifyUserByIdOr404 } from "../../../middlewares";
import { dataRepo, clientRepo } from "../../../repositories";

describe("Verify User by ID or 404 - Middleware | Unit tests", () => {
  const req: Partial<Request> = { params: {} };
  const next: NextFunction = jest.fn();
  const response = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const newUserClient = {
    name: "Maria",
    subscription: 154532465,
  };

  const newUserData = {
    cpf: 35634556815,
    birthday: "25/04/1987",
    gender: "M",
    email: "teste@teste.com",
    mobile: 3140263598,
    street: "rua sem calçamento",
    number: 9999,
    complement: "fundos",
    zip: 35790987,
    city: "teste",
    state: "RJ",
  };

  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Error 404: When user is not found", async () => {
    const res = response();
    req.params = { id: "8bda12b8-cd55-4823-8204-937ccd4e3d5j" };

    try {
      const result: any = await verifyUserByIdOr404(
        req as Request,
        res as Response,
        next
      );
    } catch (err) {
      expect(err).toBeInstanceOf(ErrorHandler);
      expect(err.statusCode).toBe(404);
      expect(err.message).toBe("User not found.");
      expect(errorHandler).toThrow();
    }
  });

  it("Should add 'user property' in the 'request' when user is found", async () => {
    const createdDataUser = await dataRepo.save({ ...newUserData });

    const createdUser = await clientRepo.save({
      ...newUserClient,
      data: createdDataUser,
    });

    const resp = response();
    req.params = { id: createdUser.id };

    const result: any = await verifyUserByIdOr404(
      req as Request,
      resp as Response,
      next
    );

    expect(req).toHaveProperty("user");
  });
});
