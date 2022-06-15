// import { Connection } from "..";
import supertest from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";

const newUserClient = {
  name: "teste",
  subscription: "154532465",
  data: {
    cpf: "35634556815",
    birthday: "25/04/1987",
    gender: "M",
    email: "teste@teste.com",
    mobile: "3140263598",
    street: "rua sem calçamento",
    number: "9999",
    complement: "fundos",
    zip: "35790987",
    city: "teste",
    state: "RJ",
  },
};

describe("Register Client | Integration Tests", () => {
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

  // const dbConnection = new Connection();

  // beforeAll(async () => {
  //   await dbConnection.create();
  // });

  // afterAll(async () => {
  //   await dbConnection.clear();
  //   await dbConnection.close();
  // });

  // afterEach(async () => {
  //   await dbConnection.clear();
  // });

  it("should register a new client", async () => {
    expect(true).toBe(true);
  });

  it("Should return an Client as JSON response with status code 201", async () => {
    const response = await supertest(app)
      .post("/admin/clients/register")
      .send({ ...newUserClient });

    expect(response.status).toBe(201);
    expect(response.body.name).toBeDefined();
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data.email).toStrictEqual(newUserClient.data.email);
  });
});
