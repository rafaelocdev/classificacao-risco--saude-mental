import { validate } from "uuid";
import { Request } from "express";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import { adminService } from "../../../services";
import { ErrorHandler, errorHandler } from "../../../errors/errors";
import { clientRepo } from "../../../repositories";

const newClientOne = {
  name: "Marcos",
  subscription: "9876566565",
  data: {
    cpf: "65465785954",
    birthday: "25/01/1989",
    gender: "M",
    email: "marcos@teste.com",
    mobile: "3240263598",
    street: "rua sem calçamento",
    number: "9999",
    complement: "fundos",
    zip: "35790987",
    city: "teste",
    state: "RJ",
  },
};

const newClientTwo = {
  name: "Tiago",
  subscription: "324688916584",
  data: {
    cpf: "54567879254",
    birthday: "25/06/1989",
    gender: "M",
    email: "tiagho@teste.com",
    mobile: "3240263598",
    street: "rua sem calçamento",
    number: "9999",
    complement: "fundos",
    zip: "35790987",
    city: "teste",
    state: "SP",
  },
};

const newClientData = {
  name: "Marcos",
  subscription: "9876566587",
  data: {
    cpf: "65465785111",
    birthday: "25/01/1989",
    gender: "M",
    email: "marcos2@teste.com",
    mobile: "3240263598",
    street: "rua sem calçamento",
    number: "9999",
    complement: "fundos",
    zip: "35790987",
    city: "teste",
    state: "SP",
  },
};

let idClient1 = "";
let idClient2 = "";

describe("Testing the Admin services | Unit tests", () => {
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

  test("Should not be able to update a client using an existing CPF", async () => {
    try {
      const createdClient1 = await adminService.registerClient({
        validated: newClientOne,
      } as Request);
      idClient1 = createdClient1.id;

      const createdClient2 = await adminService.registerClient({
        validated: newClientTwo,
      } as Request);
      idClient2 = createdClient2.id;

      const returnUpdateClient: any = await adminService.updateClient({
        validated: { data: { cpf: newClientTwo.data.cpf } },
        user: createdClient1,
      } as Request);
    } catch (err) {
      expect(err).toBeInstanceOf(ErrorHandler);
      expect(err.statusCode).toBe(409);
      expect(err.message).toBe("CPF already exists.");
      expect(errorHandler).toThrow();
    }
  });

  test("Should not be able to update a client using an existing subscription", async () => {
    try {
      const foundClient = await clientRepo.findOneBy({ id: idClient1 });

      const returnUpdateClient: any = await adminService.updateClient({
        validated: { subscription: newClientTwo.subscription },
        user: foundClient,
      } as Request);
    } catch (err) {
      expect(err).toBeInstanceOf(ErrorHandler);
      expect(err.statusCode).toBe(409);
      expect(err.message).toBe("Subscription already exists.");
      expect(errorHandler).toThrow();
    }
  });

  test("Should not be able to update a client using an existing email", async () => {
    try {
      const foundClient = await clientRepo.findOneBy({ id: idClient1 });

      const returnUpdateClient: any = await adminService.updateClient({
        validated: { data: { email: newClientTwo.data.email } },
        user: foundClient,
      } as Request);
    } catch (err) {
      expect(err).toBeInstanceOf(ErrorHandler);
      expect(err.statusCode).toBe(409);
      expect(err.message).toBe("Email already exists.");
      expect(errorHandler).toThrow();
    }
  });

  test("Should be able to update a client using not existing data", async () => {
    const foundClient = await clientRepo.findOneBy({ id: idClient1 });

    const returnUpdateClient: any = await adminService.updateClient({
      validated: newClientData,
      user: foundClient,
    } as Request);

    expect(returnUpdateClient.id).toBeDefined();
    expect(validate(returnUpdateClient.id)).toBeTruthy();
    expect(returnUpdateClient.data).toHaveProperty("cpf");
    expect(returnUpdateClient.data.cpf).toStrictEqual(newClientData.data.cpf);
  });
});
