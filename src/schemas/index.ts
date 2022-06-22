import {
  getAllEmployeesSchema,
  registerClientSchema,
  registerEmployeeSchema,
  serializeEmployeeData,
  serializedData,
  serializedUpdatedClientSchema,
  updateClientSchema,
  updateEmployeeSchema,
} from "./admin";
import { serializedClient, serializedClientWithAppointments } from "./doctor";
import { loginSchema } from "./login";
import {
  createQueryMhRiskSchema,
  serializedQueryMhRiskSchema,
} from "./nurse/queryMhRisk.schema";

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
  createQueryMhRiskSchema,
  serializedQueryMhRiskSchema,
  updateEmployeeSchema,
};
