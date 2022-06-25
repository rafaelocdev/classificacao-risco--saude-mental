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
  serializeAppointmentSchema,
  serializedFinishedAppointmentSchema,
} from "../schemas";

interface IClientById {
  client: Client;
  mhRisk: QueryMhRisk;
  appointment: Partial<Appointment>;
}

class DoctorService {
  getAppointments = async () => {
    const appointments = await appointmentRepo.listAll();

    return appointments;
  };

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

  getOpenAppointments = async () => {
    const openAppointments = (await this.getAppointments()).filter(
      (appointment) => appointment.onDuty === null,
    );

    return openAppointments;
  };

  startAppointment = async ({ decoded, appointment }: Request) => {
    const { id } = decoded;

    const foundOnDuty = await onDutyRepo.findOne({
      employee: { id } as Employee,
    });

    foundOnDuty.onDuty = true;
    await onDutyRepo.update(foundOnDuty.id, { ...foundOnDuty });

    appointment.onDuty = foundOnDuty;
    await appointmentRepo.update(appointment.id, {
      ...appointment,
    });

    const updatedAppointment = await appointmentRepo.listOne({
      id: appointment.id,
    });

    const {
      action,
      anamnesis,
      id: appointmentId,
      queryMhRisk,
    } = updatedAppointment;

    const response = {
      appointment: {
        query_mh_risk: {
          resultMhRisk: queryMhRisk.resultMhRisk.risk,
          evaluation_ate: queryMhRisk.evaluationDate,
          family_support: queryMhRisk.familySupport,
          mourning: queryMhRisk.mourning,
          drugs: queryMhRisk.drugs,
          insomnia: queryMhRisk.insomnia,
          self_aggression: queryMhRisk.selfAggression,
          id: queryMhRisk.id,
        },
        doctor: {
          id: id,
          name: foundOnDuty.employee.name,
          specialty: foundOnDuty.employee.specialty,
        },
        action: action,
        anamnesis: anamnesis,
        id: appointmentId,
      },
      subscription: queryMhRisk.client.subscription,
      client: queryMhRisk.client.name,
      id: queryMhRisk.client.id,
    };

    return response;
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
      throw new ErrorHandler(400, err);
    }

    return serializedFinishedAppointmentSchema.validate(objReturn, {
      stripUnknown: true,
    });
  };
}

export default new DoctorService();
