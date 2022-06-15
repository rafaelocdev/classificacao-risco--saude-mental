import { Router } from "express";

// controllers
import { adminController } from "../controller";

// middlewares
import { verifyUserByIdOr404, validateSchema } from "../middlewares";
import { validateTokenMiddleware } from "../middlewares";

// schemas
import { registerClientSchema } from "../schemas";
import { updateClientSchema } from "../schemas";

const adminRouter = Router();

// Registar funcionarios
adminRouter.post("/employees/register");
// Listar funcionarios
adminRouter.get("/employees", adminController.getAllEmployees);
// Alterar funcionarios
adminRouter.patch("/employees/:id");

// Registar clientes
adminRouter.post(
  "/clients/register",
  validateSchema(registerClientSchema),
  adminController.registerClient
);
// Listar clientes
adminRouter.get("/clients");
// Alterar clientes
adminRouter.patch(
  "/clients/:id",
  validateSchema(updateClientSchema),
  // validateTokenMiddleware,
  verifyUserByIdOr404,
  adminController.updateClient
);
// Deletar clientes
adminRouter.delete("/clients/:id");

// Alterar procedimentos
adminRouter.get("/procedures/:risk");

export default adminRouter;
