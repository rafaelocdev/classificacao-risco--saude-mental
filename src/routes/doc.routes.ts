import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const docRouter = Router();

docRouter.use("", swaggerUi.serve);
docRouter.get("", swaggerUi.setup(swaggerDocument));

export default docRouter;
