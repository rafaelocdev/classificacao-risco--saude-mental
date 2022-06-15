import supertest from "supertest";
import app from "../../app";
import database from "..";

describe("Register client route | Integration Test", () => {
  beforeAll(async () => {
    await database.createConnection();
  });

  afterAll(async () => {
    await database.closeConnection();
  });

  it("Should return an Client as JSON response with status code 201", async () => {
    const client = {
      name: "John Doe 4",
      subscription: "5432193",
      data: {
        cpf: "512356983",
        birthday: "10/10/2010",
        gender: "M",
        email: "johndoe1@email.com",
        mobile: "987654321",
        street: "Nowhere St.",
        number: "1",
        complement: "apt. 999",
        zip: "12345678",
        city: "San Angels",
        state: "DK",
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
