import { Router } from "express";
import { getUserByIdOr404, validateSchema } from "../middlewares";
import { updateClientSchema } from "../schemas";
import { adminController } from "../controller";

const adminRouter = Router();

// Registar funcionarios
adminRouter.post("/employees/register");
// Listar funcionarios
adminRouter.get("/employees");
// Alterar funcionarios
adminRouter.patch("/employees/:id");

// Registar clientes
adminRouter.post("/clients/register");
// Listar clientes
adminRouter.get("/clients");
// Alterar clientes
adminRouter.patch(
  "/clients/:id",
  validateSchema(updateClientSchema),
  getUserByIdOr404,
  adminController.updateClient
);
// Deletar clientes
adminRouter.delete("/clients/:id");

// Alterar procedimentos
adminRouter.get("/procedures/:risk");

export default adminRouter;
