import { Router } from "express";
import { adminController } from "../controller";

// controllers
import adminControllers from "../controller/admin.controllers";

// middlewares
import { validateSchema } from "../middlewares";

// schemas
import { registerClientSchema } from "../schemas";

const adminRouter = Router();

// Registar funcionarios
adminRouter.post("/employees/register");
// Listar funcionarios
adminRouter.get("/employees", adminController.getAllEmployees);
// Alterar funcionarios
adminRouter.patch("/employees/:employeeId");

// Registar clientes
adminRouter.post(
  "/clients/register",
  validateSchema(registerClientSchema),
  adminControllers.registerClient
);
// Listar clientes
adminRouter.get("/clients");
// Alterar clientes
adminRouter.patch("/clients/:clientId");
// Deletar clientes
adminRouter.delete("/clients/:clientId");

// Alterar procedimentos
adminRouter.get("/procedures/:risk");

export default adminRouter;
