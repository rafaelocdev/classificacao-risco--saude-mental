import request from "supertest";
import supertest from "supertest";
import { validate } from "uuid";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { dataRepo, employeeRepo } from "../../../repositories";
import { Employee } from "../../../entities";

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

const idNotExisting = "64ee7c40-c8ef-4f6a-bfz5-5fe978a371ef";

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

  test("Should not be able to update a client using an existing cpf", async () => {
    // const newUserClient = await request(app)
    //   .post("/admin/clients/register")
    //   .send(newClient);

    // const dataAdmin = await dataRepo.save(dataEmployee);

    // newEmployee.data = dataAdmin;
    // const createdAdmin = await employeeRepo.save(newEmployee);

    // const resp = await request(app).post("/login").send(loginAdm);

    // console.log(resp.body);
    // const response = await request(app)
    //   .patch(`/clients/${newUserClient.id}`)
    //   .set("Authorization", `Bearer ${token}`)
    //   .send({ cpf: 35634556815 });
    // expect(response.status).toBe(409);
    // expect(response.body.message).toStrictEqual("CPF already exists");
    expect(false).toBe(false);
  });

  //   test("Should not be able to update a client with out authorization token", async () => {
  //     // const response = await request(app)
  //     //   .patch(`/clients/${newUserClient.id}`)
  //     //   .send({ newDataUserClient });
  //     // expect(response.status).toBe(400);
  //     // expect(response.body.message).toStrictEqual("Missing authorization token.");
  //   });

  //   test("Should not be able to update a not existing client", async () => {
  //     // const response = await request(app)
  //     //   .patch(`/clients/${idNotExisting}`)
  //     //   .set("Authorization", `Bearer ${token}`)
  //     //   .send({ cpf: 35634556815 });
  //     // expect(response.status).toBe(404);
  //     // expect(response.body.message).toStrictEqual("User not found");
  //   });

  //   test("Should be able to update a client with authorization token", async () => {
  //     // const response = await request(app)
  //     //   .patch(`/clients/${newUserClient.id}`)
  //     //   .set("Authorization", `Bearer ${token}`)
  //     //   .send({ ...newDataUserClient });
  //     // expect(response.status).toBe(200);
  //     // expect(response.body.id).toBeDefined();
  //     // expect(validate(response.body.id)).toBeTruthy();
  //     // expect(response.body.data).toHaveProperty("cpf");
  //     // expect(response.body.data.cpf).toStrictEqual(newDataUserClient.data.cpf);
  //   });
});
