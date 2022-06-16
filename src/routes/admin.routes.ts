import { Router } from "express";

// controllers
import { adminController } from "../controller";

// middlewares
import { validateIsAdmin, validateSchema, validateToken } from "../middlewares";

// schemas
import { registerClientSchema, registerEmployeeSchema } from "../schemas";

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
adminRouter.patch("/employees/:employeeId");

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
adminRouter.patch("/clients/:clientId");
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
