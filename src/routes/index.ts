import adminRouter from "./admin.routes";
import doctorRouter from "./doctor.routes";
import nurseRouter from "./nurse.routes";
import { Express, Request, Response } from "express";
import loginRouter from "./login.routes";

const registerRoutes = (app: Express) => {
  app.use("/admin", adminRouter);
  app.use("", doctorRouter);
  app.use("", nurseRouter);
  app.use(loginRouter);

  // all invalid routes fall into this
  app.all("*", (_: Request, res: Response) => {
    return res.status(404).json({
      message: "Not found",
    });
  });
};

export default registerRoutes;
