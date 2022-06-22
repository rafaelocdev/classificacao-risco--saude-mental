import { Request } from "express";
import { Appointment, Client, QueryMhRisk } from "../entities";
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
  serializedFinishedAppointmentSchema,
} from "../schemas";

interface IClientById {
  client: Client;
  mhRisk: QueryMhRisk;
  appointment: Partial<Appointment>;
}

export default class DoctorService {
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

  finishAppointment = async ({ appointment, validated }: Request) => {
    let objReturn = {};

    try {
      await appointmentRepo.update(appointment.id, { ...validated });

      await onDutyRepo.update(appointment.onDuty.id, { onDuty: false });

      const updatedAppointment = await appointmentRepo.listOne({
        id: appointment.id,
      });

      objReturn = {
        id: updatedAppointment.queryMhRisk.client.id,
        client: updatedAppointment.queryMhRisk.client.name,
        subscription: updatedAppointment.queryMhRisk.client.subscription,
        appointment: {
          id: updatedAppointment.id,
          anamnesis: updatedAppointment.anamnesis,
          action: updatedAppointment.action,
          doctor: {
            id: updatedAppointment.onDuty.employee.id,
            name: updatedAppointment.onDuty.employee.name,
            specialty: updatedAppointment.onDuty.employee.specialty,
          },
          query_mh_risk: {
            id: updatedAppointment.queryMhRisk.id,
            depression: updatedAppointment.queryMhRisk.depression,
            self_aggression: updatedAppointment.queryMhRisk.selfAggression,
            insomnia: updatedAppointment.queryMhRisk.insomnia,
            drugs: updatedAppointment.queryMhRisk.drugs,
            mourning: updatedAppointment.queryMhRisk.mourning,
            family_support: updatedAppointment.queryMhRisk.familySupport,
            evaluation_date: updatedAppointment.queryMhRisk.evaluationDate,
            result_mh_risk: updatedAppointment.queryMhRisk.resultMhRisk.risk,
          },
        },
      };
    } catch (err) {
      throw new ErrorHandler(500, err);
    }

    return serializedFinishedAppointmentSchema.validate(objReturn, {
      stripUnknown: true,
    });
  };
}
