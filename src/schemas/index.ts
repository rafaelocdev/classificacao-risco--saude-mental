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
};
