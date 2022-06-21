import { Request } from "express";
import { Appointment, Client, Employee, QueryMhRisk } from "../entities";
import { ErrorHandler } from "../errors/errors";
import {
  appointmentRepo,
  clientRepo,
  dataRepo,
  onDutyRepo,
  queryMhRiskRepo,
} from "../repositories";
import * as uuid from "uuid";
import {
  serializedClient,
  serializedClientWithAppointments,
  serializeOnDutySchema,
} from "../schemas";
import { validate } from "uuid";

interface IClientById {
  client: Client;
  mhRisk: QueryMhRisk;
  appointment: Partial<Appointment>;
}

class DoctorService {
  getClientById = async ({ params }: Request) => {
    const { clientId } = params;

    if (!uuid.validate(clientId)) {
      throw new ErrorHandler(400, "Invalid input syntax for type uuid");
    }

    const client = await clientRepo.findOneBy({ data: { id: clientId } });

    if (!client) {
      throw new ErrorHandler(404, "Client not found");
    }

    client.data = await dataRepo.findOneBy({ id: clientId });

    const mhRisk = await queryMhRiskRepo.findOneBy({
      client: { id: clientId },
    });

    if (!mhRisk) {
      return await serializedClient.validate(client, { stripUnknown: true });
    }

    const appointment = await appointmentRepo.listOne({
      queryMhRisk: mhRisk.id,
    });

    const clientWithAppointments: IClientById = { client, mhRisk, appointment };

    return serializedClientWithAppointments.validate(clientWithAppointments, {
      stripUnknown: true,
    });
  };

  finishAppointment = async ({ appointment }: Request) => {};

  startAppointment = async ({ decoded, appointment }: Request) => {
    const { id } = decoded;

    appointment.onDuty = await onDutyRepo.findOne({
      employee: { id } as Employee,
    });

    const updatedAppointment = await appointmentRepo.update(appointment.id, {
      ...appointment,
    });

    return await serializeOnDutySchema.validate(updatedAppointment, {
      stripUnknown: true,
    });
  };
}

export default new DoctorService();
