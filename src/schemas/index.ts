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
import {
  serializedClient,
  serializedClientWithAppointments,
  serializeOnDutySchema,
} from "./doctor";
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
  serializeOnDutySchema,
  createQueryMhRiskSchema,
  serializedQueryMhRiskSchema,
  updateEmployeeSchema,
};
