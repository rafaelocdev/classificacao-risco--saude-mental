import {
  getAllEmployeesSchema,
  registerClientSchema,
  registerEmployeeSchema,
  serializeEmployeeData,
  serializedData,
  serializedUpdatedClientSchema,
  updateClientSchema,
} from "./admin";
import { serializedClient, serializedClientWithAppointments } from "./doctor";
import { loginSchema } from "./login";
import {
  finishAppointmentSchema,
  serializedFinishedAppointmentSchema,
} from "./doctor";

export {
  getAllEmployeesSchema,
  registerClientSchema,
  registerEmployeeSchema,
  serializeEmployeeData,
  serializedData,
  serializedUpdatedClientSchema,
  updateClientSchema,
  serializedClient,
  serializedClientWithAppointments,
  loginSchema,
  finishAppointmentSchema,
  serializedFinishedAppointmentSchema,
};
