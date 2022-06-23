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

const adminCredentials = {
  email: "admin@admin.com",
  password: "admin",
};

let token = "";

describe("List all employee route | Integration Test", () => {
  beforeAll(async () => {
    await database.createConnection();
  });

  afterAll(async () => {
    await database.closeConnection();
  });

  it("Should return all Employees as JSON response with status code 200", async () => {
    await adminService.registerEmployee({ validated: adminData });

    const adminResponse = await supertest(app)
      .post("/login")
      .send(adminCredentials);

    token = adminResponse.body.Token;

    const response = await supertest(app)
      .get("/admin/employees")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("employees");
  });

  it("Should return an error message with status code 400 due to missing JWT", async () => {
    const response = await supertest(app).get("/admin/employees");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
