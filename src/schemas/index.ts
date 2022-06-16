import {
  registerClientSchema,
  serializedData,
} from "./admin/registerClient.schema";

import { registerEmployeeSchema, serializeEmployeeData } from "./admin";

import loginSchema from "./login/login.schema";
import { serializedClient, serializedClientWithAppointments } from "./doctor";

export {
  registerClientSchema,
  serializedData,
  registerEmployeeSchema,
  serializeEmployeeData,
  loginSchema,
  serializedClient,
  serializedClientWithAppointments,
};
