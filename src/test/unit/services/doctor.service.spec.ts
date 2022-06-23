import { validate } from "uuid";
import { Request } from "express";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import { doctorService, adminService } from "../../../services";
import {
  appointmentRepo,
  onDutyRepo,
  queryMhRiskRepo,
  resultMhRiskRepo,
} from "../../../repositories";

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

let appointmentId = "";

const dataFinishAppointment = {
  anamnesis: "caso grave",
  action: "camisa de força",
};

describe("Testing the Doctor services | Unit tests", () => {
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

  test("Should be able to update an appointment, finishing it.", async () => {
    try {
      const createdClient = await adminService.registerClient({
        validated: newClient,
      } as Request);
      idClient1 = createdClient.id;

      const createdDoctor = await adminService.registerEmployee({
        validated: newDoctor,
      });

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

      appointmentId = createdAppointment.id;

      const finishedAppointment = await doctorService.finishAppointment({
        appointment: createdAppointment,
        validated: dataFinishAppointment,
      } as Request);

      expect(finishedAppointment.id).toBeDefined();
      expect(validate(finishedAppointment.id)).toBeTruthy();
      expect(finishedAppointment.appointment).toHaveProperty("id");
      expect(finishedAppointment.appointment.id).toStrictEqual(appointmentId);
      expect(finishedAppointment.appointment).toHaveProperty("action");
      expect(finishedAppointment.appointment.action).toStrictEqual(
        dataFinishAppointment.action,
      );
    } catch (err) {
      console.error(err);
    }
  });
});
