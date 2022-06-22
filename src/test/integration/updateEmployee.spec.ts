import supertest from "supertest";
import app from "../../app";
import database from "..";
import { adminService } from "../../services";

const adminData = {
  name: "Admin",
  password: "admin",
  register: "111111",
  job: "Administrador(a)",
  specialty: "Admin",
  isActive: true,
  data: {
    cpf: "329.825.570-02",
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

const employeeData = {
  name: "John Doe",
  password: "123456",
  register: "123",
  job: "Médico(a)",
  specialty: "Psiquiatra",
  data: {
    cpf: "551.616.510-59",
    birthday: "10/10/2010",
    gender: "M",
    email: "johndoe@email.com",
    mobile: "(13) 999999999",
    street: "Nowhere St.",
    number: "1",
    complement: "apt. 999",
    zip: "11075-350",
    city: "São Paulo",
    state: "SP",
  },
};

const employeeNewData = {
  name: "John Smith",
  data: {
    email: "johnsmith@email.com",
  },
};

const duplicateRegister = {
  register: "111111",
};

const duplicateCpf = {
  data: {
    cpf: "329.825.570-02",
  },
};

const duplicateEmail = {
  data: {
    email: "admin@admin.com",
  },
};

let token = "";
let employeeId = "";

describe("Update employee route | Integration Test", () => {
  beforeAll(async () => {
    await database.createConnection();
  });

  afterAll(async () => {
    await database.closeConnection();
  });

  it("Should return an Employee as JSON response with status code 200", async () => {
    await adminService.registerEmployee({ validated: adminData });

    const adminResponse = await supertest(app)
      .post("/login")
      .send(adminCredentials);

    token = adminResponse.body.Token;

    const newEmployee = await supertest(app)
      .post("/admin/employees/register")
      .set("Authorization", `Bearer ${token}`)
      .send(employeeData);

    employeeId = newEmployee.body.id;

    const response = await supertest(app)
      .patch(`/admin/employees/${employeeId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...employeeNewData });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.email).toStrictEqual("johnsmith@email.com");
  });

  it("Should not be able to update data using duplicate register. Must return status code 409", async () => {
    const response = await supertest(app)
      .patch(`/admin/employees/${employeeId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...duplicateRegister });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  it("Should not be able to update data using duplicate CPF. Must return status code 409", async () => {
    const response = await supertest(app)
      .patch(`/admin/employees/${employeeId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...duplicateCpf });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  it("Should not be able to update data using duplicate email. Must return status code 409", async () => {
    const response = await supertest(app)
      .patch(`/admin/employees/${employeeId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...duplicateEmail });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });
});
