import { Router } from "express";

import { adminController } from "../controller";
import {
  verifyUserByIdOr404,
  validateSchema,
  validateToken,
  validateIsAdmin,
} from "../middlewares";
import {
  registerClientSchema,
  registerEmployeeSchema,
  updateClientSchema,
} from "../schemas";

const adminRouter = Router();

// Registar funcionarios
adminRouter.post(
  "/employees/register",
  validateToken,
  validateIsAdmin,
  validateSchema(registerEmployeeSchema),
  adminController.registerEmployee
);
// Listar funcionarios
adminRouter.get("/employees", adminController.getAllEmployees);
// Alterar funcionarios
adminRouter.patch("/employees/:id");

// Registar clientes
adminRouter.post(
  "/clients/register",
  validateToken,
  validateIsAdmin,
  validateSchema(registerClientSchema),
  adminController.registerClient
);
// Listar clientes
adminRouter.get("/clients", adminController.getClients);
// Alterar clientes
adminRouter.patch(
  "/clients/:id",
  validateToken,
  validateIsAdmin,
  validateSchema(updateClientSchema),
  verifyUserByIdOr404,
  adminController.updateClient
);

// Deletar clientes
adminRouter.delete(
  "/clients/:clientId",
  validateToken,
  validateIsAdmin,
  adminController.deleteClient
);

// Alterar procedimentos
adminRouter.get("/procedures/:risk");

export default adminRouter;
