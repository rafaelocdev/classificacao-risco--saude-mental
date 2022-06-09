import adminRouter from "./admin.routes";
import doctorRouter from "./doctor.routes";
import nurseRouter from "./nurse.routes";
import { Express } from "express";

const registerRoutes = (app: Express) => {
  app.use("/admin", adminRouter);
  app.use("", doctorRouter);
  app.use("", nurseRouter);
};

export default registerRoutes;
