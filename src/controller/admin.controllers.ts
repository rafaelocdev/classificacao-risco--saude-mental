import { Request, Response } from "express";
import { adminService } from "../services";

class AdminController {
  registerClient = async (req: Request, res: Response) => {
    const newClient = await adminService.registerClient(req);

    return res.status(201).json(newClient);
  };

  getAllEmployees = async (_: Request, res: Response) => {
    const employees = await adminService.getAllEmployees();

    return res.status(200).json({ employees });
  };

  updateClient = async (req: Request, res: Response) => {
    const updatedUser = await adminService.updateClient(req);

    return res.status(200).json(updatedUser);
  };
}

export default new AdminController();
