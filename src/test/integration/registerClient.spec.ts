import supertest from "supertest";
import app from "../../app";
import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import Database from "..";

describe("Create user route | Integration Test", () => {
  const database = new Database();
  database.createConnectionBeforeAll();
  database.closeConnectionAfterAll();

  it("Should return an Client as JSON response with status code 201", async () => {
    const client = {
      name: faker.name.firstName() + " " + faker.name.findName(),
      subscription: faker.random.numeric(20),
      data: {
        cpf: faker.random.numeric(11),
        birthday: "16/04/1987",
        gender: faker.datatype.string(1),
        email: faker.internet.email(),
        mobile: faker.random.numeric(11),
        street: faker.name.firstName(),
        number: faker.random.numeric(3),
        complement: faker.datatype.string(5),
        zip: faker.random.numeric(8),
        city: faker.address.cityName(),
        state: faker.address.countryCode("alpha-2"),
      },
    };

    const response = await supertest(app)
      .post("/admin/clients/register")
      .send({ ...client });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.email).toStrictEqual(client.data.email);
  });
});
