import request from "supertest";
import { validate } from "uuid";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import { Request } from "express";
import { adminService } from "../../services";
import {
  appointmentRepo,
  onDutyRepo,
  queryMhRiskRepo,
  resultMhRiskRepo,
} from "../../repositories";

const newClient = {
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

const newDoctor = {
  name: "Zao Ching",
  password: "123456",
  job: "Doctor",
  specialty: "Doctor",
  register: "2135897",
  active: true,
  data: {
    cpf: "42061484735",
    birthday: "25/01/1989",
    gender: "M",
    email: "zao@doctor.com",
    mobile: "3240263582",
    street: "rua sem calçamento",
    number: "9999",
    complement: "fundos",
    zip: "35790987",
    city: "teste",
    state: "RJ",
  },
};

const loginDoctor = {
  email: "zao@doctor.com",
  password: "123456",
};

let tokenDoctor = "";

let idClient1 = "";

const onDutyData = {
  onDuty: true,
  available: true,
};

const resultMhRiskData = {
  risk: "grave",
  procedure: "Direcionamento prioritário, atendimento clínico imediato.",
};

const query_mh_riskData = {
  depression: "grave",
  selfAggression: true,
  insomnia: true,
  drugs: true,
  mourning: true,
  familySupport: false,
  evaluation_date: "Wed Jan 01 2020 23:10:10",
};

let id = "";

const dataFinishAppointment = {
  anamnesis: "caso grave",
  action: "camisa de força",
};

describe("Testing the finish Appointment route", () => {
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

  test("Should be able to update a appointment, finishing it.", async () => {
    try {
      const createdClient = await adminService.registerClient({
        validated: newClient,
      } as Request);
      idClient1 = createdClient.id;

      const createdDoctor = await adminService.registerEmployee({
        validated: newDoctor,
      });

      const getLoginDoctor = await request(app)
        .post("/login")
        .send(loginDoctor);
      tokenDoctor = getLoginDoctor.body.Token;

      const createdOnDuty = await onDutyRepo.save({
        ...onDutyData,
        employee: createdDoctor.id,
      });

      const createResultMhRisk = await resultMhRiskRepo.save({
        ...resultMhRiskData,
      });

      const getResultMhRisk = await resultMhRiskRepo.findOneBy({
        risk: "grave",
      });

      const createdQueryMhRisk = await queryMhRiskRepo.save({
        ...query_mh_riskData,
        client: createdClient.id,
        resultMhRisk: getResultMhRisk,
      });

      const createdAppointment = await appointmentRepo.create({
        queryMhRisk: createdQueryMhRisk,
        onDuty: createdOnDuty,
      });

      id = createdAppointment.id;
    } catch (err) {
      console.error(err);
    }

    const response = await request(app)
      .patch(`/appointments/finish/${id}`)
      .set("Authorization", `Bearer ${tokenDoctor}`)
      .send({ ...dataFinishAppointment });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(validate(response.body.id)).toBeTruthy();
    expect(response.body.appointment).toHaveProperty("id");
    expect(response.body.appointment.id).toStrictEqual(id);
  });

  test("Should not be able to update an appointment missing 'anamnesis' key in body request.", async () => {
    const response = await request(app)
      .patch(`/appointments/finish/${id}`)
      .set("Authorization", `Bearer ${tokenDoctor}`)
      .send({ action: "camisa de força" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error[0]).toStrictEqual(
      "anamnesis is a required field"
    );
  });

  test("Should not be able to update an appointment missing 'action' key in body request.", async () => {
    const response = await request(app)
      .patch(`/appointments/finish/${id}`)
      .set("Authorization", `Bearer ${tokenDoctor}`)
      .send({ anamnesis: "caso grave" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error[0]).toStrictEqual("action is a required field");
  });

  test("Should not be able to update an appointment with out doctor authorization token", async () => {
    const response = await request(app)
      .patch(`/appointments/finish/${id}`)
      .send({ ...dataFinishAppointment });

    expect(response.status).toBe(400);
    expect(response.body.message).toStrictEqual("Jwt not found.");
  });

  test("Should not be able to update a not existing appointment", async () => {
    id = "6a22b39d-4197-4866-a480-228963386471";

    const response = await request(app)
      .patch(`/appointments/finish/${id}`)
      .set("Authorization", `Bearer ${tokenDoctor}`)
      .send({ ...dataFinishAppointment });

    expect(response.status).toBe(404);
    expect(response.body.message).toStrictEqual("Appointment not found.");
  });
});
