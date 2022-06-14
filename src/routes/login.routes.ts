import { Router } from "express";
import { loginController } from "../controller";
import validateSchema from "../middlewares/validateSchema.middleware";
import { loginSchema } from "../schemas";

const loginRouter = Router();

loginRouter.post("/login", validateSchema(loginSchema), loginController.login);

export default loginRouter;
