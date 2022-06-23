import { NextFunction, Request, Response } from "express";
import { ErrorHandler, errorHandler } from "../../../errors/errors";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import { verifyAppointmentOr404 } from "../../../middlewares";
import {
  appointmentRepo,
  onDutyRepo,
  queryMhRiskRepo,
  resultMhRiskRepo,
} from "../../../repositories";
import { dataRepo, clientRepo, employeeRepo } from "../../../repositories";
import { QueryMhRisk } from "../../../entities";
import { v4 as uuid } from "uuid";

describe("Verify Appointment or 404 - Middleware | Unit tests", () => {
  const req: Partial<Request> = { params: {} };
  const next: NextFunction = jest.fn();
  const response = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const newDoctor = {
    name: "Jin Chen Huo",
    password: "123456",
    register: "47838552346",
    job: "doctor",
    specialty: "doctor",
    isActive: true,
  };

  const dataDoctor = {
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
  };

  const newOnDuty = {
    on_duty: true,
    available: true,
  };

  const newUserClient = {
    name: "Maria",
    subscription: "154532465",
  };

  const newUserData = {
    cpf: "01385393246",
    birthday: "25/04/1987",
    gender: "M",
    email: "teste@teste.com",
    mobile: "3140263598",
    street: "rua sem calçamento",
    number: "9999",
    complement: "fundos",
    zip: "35790-987",
    city: "teste",
    state: "RJ",
  };

  const newQueryMHRisk = {
    depression: "Yes",
    selfAggression: true,
    insomnia: true,
    drugs: true,
    mourning: true,
    familySupport: false,
  };

  const newAppointment = {
    anamnesis: "",
    action: "",
  };

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

  it("Error 404: When appointment is not found", async () => {
    const res = response();
    req.params = { id: uuid() };

    try {
      const result: any = await verifyAppointmentOr404(
        req as Request,
        res as Response,
        next,
      );
    } catch (err) {
      expect(err).toBeInstanceOf(ErrorHandler);
      expect(err.statusCode).toBe(404);
      expect(err.message).toBe("Appointment not found.");
      expect(errorHandler).toThrow();
    }
  });

  it("Should add 'appointment property' in the 'request' when appointment is found", async () => {
    try {
      //cria data para Doctor
      const createdDoctorData = await dataRepo.save({ ...dataDoctor });
      //cria Doctor com o data anterior
      const createdDoctor = await employeeRepo.save({
        ...newDoctor,
        data: createdDoctorData,
      });
      // cria on_duty do Doctor acima
      const createdOnDuty = await onDutyRepo.save({
        ...newOnDuty,
        employee: createdDoctor,
      });
      //cria data para client
      const createdDataUser = await dataRepo.save({ ...newUserData });
      // cria client com data acima
      const createdUser = await clientRepo.save({
        ...newUserClient,
        data: createdDataUser,
      });
      //pega o result mh risk
      const resMhRisk = await resultMhRiskRepo.findOneBy({ risk: "grave" });
      //cria query mh risk com o result mh risk acima
      const createdQueryMhRisk = await queryMhRiskRepo.save({
        ...newQueryMHRisk,
        resultMhRisk: resMhRisk,
        client: createdUser,
      } as Partial<QueryMhRisk>);
      // cria appointment com o on_duty e query_mh_risk criados
      const createdAppointment = await appointmentRepo.create({
        ...newAppointment,
        onDuty: createdOnDuty,
        queryMhRisk: createdQueryMhRisk,
      });

      const resp = response();
      req.params = { id: createdAppointment.id };

      const result: any = await verifyAppointmentOr404(
        req as Request,
        resp as Response,
        next,
      );

      expect(req).toHaveProperty("appointment");
    } catch (err) {
      console.error(err);
    }
  });
});
