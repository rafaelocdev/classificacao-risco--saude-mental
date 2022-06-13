import { Request, Response } from "express";
import adminServices from "../services/admin.services";
class AdminController {
  registerClient = async (req: Request, res: Response) => {
    const newClient = await adminServices.registerClient(req);

    return res.status(201).json(newClient);
  };
}

export default new AdminController();
