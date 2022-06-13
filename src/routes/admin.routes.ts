import { Router } from "express";
import adminControllers from "../controller/admin.controllers";

const adminRouter = Router();

// Registar funcionarios
adminRouter.post("/employees/register");
// Listar funcionarios
adminRouter.get("/employees");
// Alterar funcionarios
adminRouter.patch("/employees/:employeeId");

// Registar clientes
adminRouter.post("/clients/register", adminControllers.registerClient);
// Listar clientes
adminRouter.get("/clients");
// Alterar clientes
adminRouter.patch("/clients/:clientId");
// Deletar clientes
adminRouter.delete("/clients/:clientId");

// Alterar procedimentos
adminRouter.get("/procedures/:risk");

export default adminRouter;
