import supertest from "supertest";
import app from "../../app";
import database from "..";
import { adminService, nurseService } from "../../services";
import { Client, QueryMhRisk } from "../../entities";
import { validate } from "uuid";
import { Request } from "express";
import { resultMhRiskRepo } from "../../repositories";

const adminData = {
  name: "Admin",
  password: "admini",
  register: "329651256456",
  job: "Admin",
  specialty: "Admin",
  isActive: true,
  data: {
    cpf: "027.985.220-72",
    birthday: "25/04/1987",
    gender: "M",
    email: "admin@admin.com",
    mobile: "(31)40263-5985",
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
  password: "admini",
};

const clientData = {
  name: "John Doe",
  subscription: "543219376",
  data: {
    cpf: "216.983.050-28",
    birthday: "10/10/2010",
    gender: "M",
    email: "johndoe999@email.com",
    mobile: "(13) 999999999",
    street: "Nowhere St.",
    number: "1",
    complement: "apt. 999",
    zip: "11075-350",
    city: "San Angels",
    state: "SP",
  },
};

const nurseData = {
  name: "Nurse",
  password: "nursee",
  register: "64564646984",
  job: "Nurse",
  specialty: "N/A",
  data: {
    cpf: "880.127.530-73",
    birthday: "25/04/1999",
    gender: "F",
    email: "nurse@nurse.com",
    mobile: "(13) 98865-4664",
    street: "rua sem calçamento",
    number: "989",
    complement: "fundos",
    zip: "35792-124",
    city: "teste",
    state: "SP",
  },
};

const nurseCredentials = {
  email: "nurse@nurse.com",
  password: "nursee",
};

const validQueryMhRiskData = {
  depression: "1",
  selfAggression: true,
  insomnia: true,
  drugs: false,
  mourning: false,
  familySupport: true,
};

const invalidQueryMhRiskData = {
  depression: "1",
  selfAggression: true,
};

describe("Register query mh risk route | Integration Test", () => {
  beforeAll(async () => {
    await database.createConnection();
  });

  afterAll(async () => {
    await database.closeConnection();
  });

  it("Should return a query mh risk as JSON response with status code 201", async () => {
    await adminService.registerEmployee({ validated: adminData });

    const adminResponse = await supertest(app)
      .post("/login")
      .send(adminCredentials);

    const tokenAdm = adminResponse.body.Token;

    const client = await supertest(app)
      .post("/admin/clients/register")
      .set("Authorization", `Bearer ${tokenAdm}`)
      .send({ ...clientData });

    const nurse = await supertest(app)
      .post("/admin/employees/register")
      .set("Authorization", `Bearer ${tokenAdm}`)
      .send({ ...nurseData });

    const nurseResponse = await supertest(app)
      .post("/login")
      .send(nurseCredentials);

    const tokenNurse = nurseResponse.body.Token;

    const response = await supertest(app)
      .post(`/query-mh-risk/${client.body.id}`)
      .set("Authorization", `Bearer ${tokenNurse}`)
      .send(validQueryMhRiskData);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(validate(response.body.id)).toBeTruthy();
    expect(response.body.data).toHaveProperty("resultMhRisk");
  });

  //   it("Should return an error message with status code 400", async () => {
  //     const response = await supertest(app)
  //       .post("/query-mh-risk/17d89c88-4173-4579-bef3-a9f3de506b4f")
  //       .send({ ...validQueryMhRiskData });

  //     expect(response.status).toBe(401);
  //     expect(response.body).toHaveProperty("error");
  //   });

  //   it("Should return an error message with status code 400", async () => {
  //     const response = await supertest(app)
  //       .post("/query-mh-risk/17d89c88-4173-4579-bef3-a9f3de506b4f")
  //       .set("Authorization", `Bearer ${token}`)
  //       .send({ ...invalidQueryMhRiskData });

  //     expect(response.status).toBe(400);
  //     expect(response.body).toHaveProperty("error");
  //   });
});
