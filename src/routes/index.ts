import adminRouter from "./admin.routes";
import doctorRouter from "./doctor.routes";
import nurseRouter from "./nurse.routes";
import { Express } from "express";
import loginRouter from "./login.routes";

const registerRoutes = (app: Express) => {
  app.use("/admin", adminRouter);
  app.use("", doctorRouter);
  app.use("", nurseRouter);
  app.use(loginRouter);
};

export default registerRoutes;
