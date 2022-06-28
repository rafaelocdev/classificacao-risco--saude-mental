import adminRouter from "./admin.routes";
import doctorRouter from "./doctor.routes";
import nurseRouter from "./nurse.routes";
import { Express, Request, Response } from "express";
import loginRouter from "./login.routes";
import docRouter from "./doc.routes";
import activationRouter from "./activation.routes";

const registerRoutes = (app: Express) => {
  app.use("/admin", adminRouter);
  app.use("", doctorRouter);
  app.use("", nurseRouter);
  app.use(loginRouter);
  app.use("/doc", docRouter);
  app.use("", activationRouter);

  // all invalid routes fall into this
  app.all("*", (_: Request, res: Response) => {
    return res.status(404).json({
      error: "Not found.",
    });
  });
};

export default registerRoutes;
