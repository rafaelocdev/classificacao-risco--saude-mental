import request from "supertest";
import { validate } from "uuid";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import { adminService } from "../../services";

const newEmployee1 = {
  name: "admin",
  password: "123456",
  register: "35648453645",
  job: "doctor",
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

const newEmployee2 = {
  name: "Doctor",
  password: "123456",
  register: "47838552346",
  job: "doctor",
  specialty: "Doctor",
  isActive: true,
  data: {
    cpf: "47838552346",
    birthday: "25/04/1987",
    gender: "M",
    email: "doctor@doctor.com",
    mobile: "3140263598",
    street: "rua sem calçamento",
    number: "9999",
    complement: "fundos",
    zip: "35792-124",
    city: "teste",
    state: "RJ",
  },
};

const loginAdm = {
  email: "admin@admin.com",
  password: "123456",
};

const loginNotAdm = {
  email: "doctor@doctor.com",
  password: "123456",
};

let tokenAdmin = "";
let tokenNotAdmin = "";

const idNotExisting = "64ee7c40-c8ef-4f6a-bfz5-5fe978a371ef";
let idNewClient1 = "";

const newClient1 = {
  name: "Marcos",
  subscription: "9876566565",
  data: {
    cpf: "58896153514",
    birthday: "25/01/1989",
    gender: "M",
    email: "marcos@teste.com",
    mobile: "3240263598",
    street: "rua sem calçamento",
    number: "9999",
    complement: "fundos",
    zip: "35790-987",
    city: "teste",
    state: "RJ",
  },
};

const newClient2 = {
  name: "Tiago",
  subscription: "564656866565",
  data: {
    cpf: "77476178106",
    birthday: "25/01/1989",
    gender: "M",
    email: "ttiago@teste.com",
    mobile: "3240263598",
    street: "rua sem calçamento",
    number: "9999",
    complement: "fundos",
    zip: "35792-987",
    city: "teste",
    state: "RJ",
  },
};

const dataToUpdate = {
  name: "Marcos",
  subscription: "01385793146",
  data: {
    cpf: "01385393246",
    birthday: "08/10/1988",
  },
};

describe("Testing the client update route", () => {
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
    const createdAdmin = await adminService.registerEmployee({
      validated: newEmployee1,
    });

    const loginAdmin = await request(app).post("/login").send(loginAdm);
    tokenAdmin = loginAdmin.body.Token;

    const createdNotAdmin = await adminService.registerEmployee({
      validated: newEmployee2,
    });

    const loginNotAdmin = await request(app).post("/login").send(loginNotAdm);
    tokenNotAdmin = loginNotAdmin.body.Token;

    const createdClient1 = await request(app)
      .post("/admin/clients/register")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(newClient1);
    idNewClient1 = createdClient1.body.id;

    const createdClient2 = await request(app)
      .post("/admin/clients/register")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(newClient2);

    const response = await request(app)
      .patch(`/admin/clients/${idNewClient1}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ data: { cpf: newClient2.data.cpf } });

    expect(response.status).toBe(409);
    expect(response.body.message).toStrictEqual("CPF already exists.");
  });

  test("Should not be able to update a client using an existing subscription", async () => {
    const response = await request(app)
      .patch(`/admin/clients/${idNewClient1}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ subscription: newClient2.subscription });

    expect(response.status).toBe(409);
    expect(response.body.message).toStrictEqual("Subscription already exists.");
  });

  test("Should not be able to update a client using an existing email", async () => {
    const response = await request(app)
      .patch(`/admin/clients/${idNewClient1}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ data: { email: newClient2.data.email } });

    expect(response.status).toBe(409);
    expect(response.body.message).toStrictEqual("Email already exists.");
  });

  test("Should not be able to update a client with out authorization token", async () => {
    const response = await request(app)
      .patch(`/admin/clients/${idNewClient1}`)
      .send({ data: { email: newClient2.data.email } });

    expect(response.status).toBe(400);
    expect(response.body.message).toStrictEqual("Jwt not found.");
  });

  test("Should not be able to update a client with out admin authorization", async () => {
    const response = await request(app)
      .patch(`/admin/clients/${idNewClient1}`)
      .set("Authorization", `Bearer ${tokenNotAdmin}`)
      .send({ data: { email: newClient2.data.email } });

    expect(response.status).toBe(403);
    expect(response.body.message).toStrictEqual(
      "Only admins are allowed to access this route."
    );
  });

  test("Should not be able to update a not existing client", async () => {
    const response = await request(app)
      .patch(`/admin/clients/${idNotExisting}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ data: { email: newClient2.data.email } });

    expect(response.status).toBe(404);
    expect(response.body.message).toStrictEqual("User not found.");
  });

  test("Should be able to update a client with authorization token", async () => {
    const response = await request(app)
      .patch(`/admin/clients/${idNewClient1}`)
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ ...dataToUpdate });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(validate(response.body.id)).toBeTruthy();
    expect(response.body.data).toHaveProperty("cpf");
    expect(response.body.data.cpf).toStrictEqual(dataToUpdate.data.cpf);
  });
});
