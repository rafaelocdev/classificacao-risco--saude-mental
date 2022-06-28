import { Router } from "express";
import { activationController } from "../controller";

const activationRouter = Router();

activationRouter.get("/activation/:code", activationController.activation);

export default activationRouter;
