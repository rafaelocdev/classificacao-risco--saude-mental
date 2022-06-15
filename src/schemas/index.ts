import { updateClientSchema, serializedUpdatedClientSchema } from "./admin";
import {
  registerClientSchema,
  serializedData,
  getAllEmployeesSchema,
} from "./admin";
import loginSchema from "./login/login.schema";
import { serializedClient, serializedClientWithAppointments } from "./doctor";

export {
  updateClientSchema,
  serializedUpdatedClientSchema,
  registerClientSchema,
  serializedData,
  getAllEmployeesSchema,
  loginSchema,
  serializedClient,
  serializedClientWithAppointments,
};
