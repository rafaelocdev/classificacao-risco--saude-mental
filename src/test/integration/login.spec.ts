import supertest from "supertest";
import app from "../../app";
import database from "..";
import { adminService } from "../../services";

const adminData = {
  name: "Admin",
  password: "admin",
  register: "329.825.570-02",
  job: "Administrador(a)",
  specialty: "Admin",
  isActive: true,
  data: {
    cpf: "36669523564",
    birthday: "25/04/1987",
    gender: "M",
    email: "admin@admin.com",
    mobile: "3140263598",
    street: "rua sem calçamento",
    number: "9999",
    complement: "fundos",
    zip: "35792-124",
    city: "teste",
    state: "RJ",
  },
};

describe("Login route | Integration Test", () => {
  beforeAll(async () => {
    await database.createConnection();
  });

  afterAll(async () => {
    await database.closeConnection();
  });

  it("should return a token and status code 200", async () => {
    await adminService.registerEmployee({ validated: adminData });

    const validCredentials = {
      email: "admin@admin.com",
      password: "admin",
    };

    const response = await supertest(app).post("/login").send(validCredentials);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("Token");
  });

  it("should return an error message and status code 401", async () => {
    const invalidCredentials = {
      email: "admin2@admin.com",
      password: "admin",
    };

    const response = await supertest(app)
      .post("/login")
      .send(invalidCredentials);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
